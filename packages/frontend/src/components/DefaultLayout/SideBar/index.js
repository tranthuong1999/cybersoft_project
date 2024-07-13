/* eslint-disable */
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Badge,
  Nav,
  NavItem,
  NavLink as RsNavLink,
} from 'reactstrap';
import classNames from 'classnames';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import * as buildingActionCreator from 'data/building/actions';
// import * as inspectionsActionCreator from 'data/inspections/actions';
// import * as inspectionsSelector from 'data/inspections/selectors';
// import * as repairsActionCreator from 'data/repairs/actions';
// import * as repairsSelector from 'data/repairs/selectors';

// import { graphql, compose } from 'react-apollo';
// import gql from 'graphql-tag';
// import PageVisibility from 'react-page-visibility';


// import SidebarFooter from './components/SidebarFooter';
// import SidebarForm from './components/SidebarForm';
// import SidebarHeader from './components/SidebarHeader';
import nav from '../_nav';

/**
 * =========================================================================
 * <Sidebar/>
 * Render sidebar element
 * ------------------------------------------------------------------------------
 * @return {ReactElement}
 * ===========================================================================
 */
class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inspectionsRequest: 0,
      repairsRequest: 0,
      inspectionsInprogressRequest: 0,
      repairsInprogressRequest: 0,
      documentInprogress: 0,
      documentInspectionsInprogress: 0,
      documentRepairInprogress: 0,
      countMessages: 0,
      userViewTab: true,
    };
    this.onClickMarkRead = this.onClickMarkRead.bind(this);
    this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
    this.timeoutCallMarkAsRead = null;
  }

  /*
   * Click open or close child menu
   */
  handleClick(e) {
    e.preventDefault();
    e.target.parentElement.classList.toggle('open');
    this.setState({
      countMessages: 0,
    });
  }

  /*
   * Active menu when menu actived
   *
   * @param {String} routeName
   * @param {Object} props string
   * @return {String} active class
   */
  activeRoute(routeName, props) {
    return props.location.pathname.indexOf(routeName) > -1 ? 'nav-item nav-dropdown open' : 'nav-item nav-dropdown';
  }

  componentWillMount() {
    // this._subscribeCountUnreadMessages(this.props.user.id);
  }

  /*
   * Count subcripbe unread message
   *
   * @param {Number} use_id
   */
  _subscribeCountUnreadMessages(user_id) {
    this.props.getCountUnreadMessages.subscribeToMore({
      // eslint-disable-next-line
      document: subscriptionUnreadMessages,
      variables: {
        user_id,
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev;
        }
        if (this.props.match.url !== '/chat') {
          this.setState({
            countMessages: subscriptionData.data.countUnreadMessages,
          });
        } else {
          this.state.countMessages = 0;
          this.setState({});
          if (subscriptionData.data.countUnreadMessages > 0 && this.state.userViewTab) {
            this.onClickMarkRead();
          }
        }
        return subscriptionData.data;
      },
    });
  }

  /*
   * Change unread to read
   */
  onClickMarkRead() {
    const conversation_id = (
      this.props.getConversations.conversations
      && this.props.getConversations.conversations.length > 0
    ) ? this.props.getConversations.conversations[0].id : null;
    if (conversation_id) {
      this.props.markRead({
        variables: {
          conversation_id,
        },
      }).then((res) => {
        this.state.countMessages = 0;
        this.setState({});
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    // let {
    //   inspectionsRequest,
    //   inspectionsInprogressRequest,
    //   repairsRequest,
    //   repairsInprogressRequest,
    //   documentInspectionsInprogress,
    //   documentRepairInprogress,
    //   countMessages,
    // } = this.state;
    // let changeState = false;
    // if (
    //   JSON.stringify(this.props.dataRedux.inspections)
    //   !== JSON.stringify(nextProps.dataRedux.inspections)
    // ) {
    //   changeState = true;
    //   inspectionsRequest = inspectionsSelector.getRequestBuildings().length;
    //   inspectionsInprogressRequest = inspectionsSelector.getInprogressBuildings().length;
    //   documentInspectionsInprogress = inspectionsSelector.getDocumentationBuildings().length;
    // }

    // if (
    //   JSON.stringify(this.props.dataRedux.repairs)
    //   !== JSON.stringify(nextProps.dataRedux.repairs)
    // ) {
    //   changeState = true;
    //   repairsRequest = repairsSelector.getRequestBuildings().length;
    //   repairsInprogressRequest = repairsSelector.getInprogressBuildings().length;
    //   documentRepairInprogress = repairsSelector.getDocumentationBuildings().length;
    // }

    // if (
    //   this.props.getCountUnreadMessages
    //   && this.props.getCountUnreadMessages.countUnreadMessages
    //   && this.props.match.url !== '/chat'
    // ) {
    //   changeState = true;
    //   countMessages = this.props.getCountUnreadMessages.countUnreadMessages;
    // }

    // const documentInprogress = documentInspectionsInprogress + documentRepairInprogress;
    // if (changeState) {
    //   this.setState({
    //     inspectionsRequest,
    //     repairsRequest,
    //     inspectionsInprogressRequest,
    //     repairsInprogressRequest,
    //     documentInspectionsInprogress,
    //     documentRepairInprogress,
    //     documentInprogress,
    //     countMessages,
    //   });
    // }
  }

  handleVisibilityChange(isVisible) {
    this.setState({ userViewTab: isVisible });
    if (isVisible && this.props.match.url === '/chat') {
      if (this.timeoutCallMarkAsRead) {
        clearTimeout(this.timeoutCallMarkAsRead);
      }
      this.timeoutCallMarkAsRead = setTimeout(() => {
        this.onClickMarkRead();
        clearTimeout(this.timeoutCallMarkAsRead);
      }, 500);
    }
  }

  render() {
    const props = this.props;
    const activeRoute = this.activeRoute;
    const handleClick = this.handleClick;

    // badge addon to NavItem
    const badge = (badge) => {
      if (badge && this.state[badge.key] > 0) {
        const classes = classNames(badge.class);
        return (<Badge style={{ marginRight: 10 }} className={`${classes} badge-pill nav-badge`} color={badge.variant}>{this.state[badge.key]}</Badge>);
      }
    };

    // simple wrapper for nav-title item
    const wrapper = item => (
      item.wrapper && item.wrapper.element
        ? (React.createElement(item.wrapper.element, item.wrapper.attributes, item.name))
        : item.name
    );

    // nav list section title
    const title = (title, key) => {
      const classes = classNames('nav-title', title.class);
      return (<li key={key} className={classes}>{wrapper(title)} </li>);
    };

    // nav list divider
    const divider = (divider, key) => {
      const classes = classNames('divider', divider.class);
      return (<li key={key} className={classes}></li>);
    };

    // nav link
    const navLink = (item, key, classes) => {
      const url = item.url ? item.url : '';

      const isExternal = (url) => {
        const link = url ? url.substring(0, 4) : '';
        return link === 'http';
      };

      return (
        <div>
          <NavItem
            key={key}
            className={classes.item}
            onClick={classes.onClick ? this.onClickMarkRead : null}
          >
            {isExternal(url)
              ? <RsNavLink href={url} className={classes.link} target="_blank" activeClassName="active">
                <span className={'menu-text'}
                >{item.name}</span>
                {badge(item.badge)}
              </RsNavLink>
              : <NavLink to={url}
                className={classes.link} activeClassName="active">
                <span className="menu-text" >{item.name}</span>
                {badge(item.badge)}
              </NavLink>
            }
          </NavItem>
        </div>
      );
    };

    // nav item with nav link
    const navItem = (item, key) => {
      const classes = {
        item: classNames(item.class),
        link: classNames('nav-link custom-nav-link', item.variant ? `nav-link-${item.variant}` : ''),
        icon: classNames(item.icon),
        iconActive: classNames(item.iconActive),
        style: item.style,
        onClick: item.onClick ? item.onClick : false,
      };
      return (
        navLink(item, key, classes)
      );
    };

    // nav dropdown
    const navDropdown = (item, key) => (
      <li key={key} className={activeRoute(item.url, props)}>
        <a className="nav-link nav-dropdown-toggle" href="#" onClick={handleClick.bind(this)}><i className={item.icon}></i>{item.name}</a>
        <ul className="nav-dropdown-items">
          {navList(item.children)}
        </ul>
      </li>
    );

    // nav type
    const navType = (item, idx) => {
      const titleText = item.title
        ? title(item, idx)
        : (
          item.divider
            ? divider(item, idx)
            : (
              item.children
                ? navDropdown(item, idx)
                : navItem(item, idx)
            )
        );
      return titleText;
    };

    // nav list
    const navList = (items) => {
      const newItems = items.map((item, index) => navType(item, index));
      return newItems;
    };

    // sidebar-nav root
    return (
      <div className="sidebar custom-sidebar">
        <nav className="sidebar-nav">
          <Nav className="custom-nav">
            {navList(nav.items)}
          </Nav>
        </nav>
      </div>
    );
  }
}

export default (Sidebar);
