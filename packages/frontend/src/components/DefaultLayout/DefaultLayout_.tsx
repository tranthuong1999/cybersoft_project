/* eslint-disable */
import React, { Component, Suspense,ContextType } from "react";
import {
  AppHeader,
  AppSidebar,
  AppSidebarNav2 as AppSidebarNav,
} from "@coreui/react";
import { History } from "history";
import {
  Container,
} from "reactstrap";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import routes from "../../constants/routes";
import Images from "../../assets/images";
const DefaultHeader = React.lazy(() => import("./DefaultHeader"));

const Menu = ({ active, data, onClick }) => {
  return (
    <div onClick={onClick} className="flex_row menu_side" style={{ height: 50 }}>
      <div style={{ width: '100%' }} className={`${active ? 'grad_active_main' : ''} flex_row`}>
        <div style={{ width: 4, height: 50 }} className={active ? 'grad_active' : ''} />
        <img
          style={{ margin: 'auto 12px' }}
          src={active ? data.image_ac : data.image_in}
          alt="logo"
          width="20"
          height="20"
        />
        <p style={{ margin: 'auto 0px', fontWeight: 'bold', color: active ? '#42B3E6' : '#747474' }}>
          {data.title}
        </p>
      </div>
    </div>
  );
};

const MenuAdmin = [
  {
    image_ac: Images.img_home_active,
    image_in: Images.img_home_inactive,
    title: 'Poll Management',
    url: '/polllist',
    active: true,
    index: 0,
  },
];

interface Iprops {
  history: History;
  location: History.LocationState & {pathname: string};
}

interface IState {
  showModalLogout: boolean;
  menu: any;
  shouldCheckLocalStorage: boolean;
  // The account was premium && has been expired
  accHasExpired: boolean;
  showSideBar: boolean;
  show: boolean;
}

class Applications extends Component<Iprops, IState> {
  constructor(props) {
    super(props);
    this.state = {
      showModalLogout: false,
      menu:  MenuAdmin,
      show: true,
      showSideBar: true,
      shouldCheckLocalStorage: false,
      // The account was premium/custom && has been expired
      accHasExpired: false
    };
    this.handleChangeStatus = this.handleChangeStatus.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }


  async componentDidMount() {
    const { location: { pathname } } = this.props;
    this.handleChangeStatus(this.getIndexRouter(pathname));
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  getIndexRouter(pathname){
    if(pathname.includes('polllist')){
      return 0;
    }else return 3;
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions)
  }

  updateWindowDimensions() {
    if(window.innerWidth > 1300){
      this.setState({ showSideBar: true })
    }else{
      this.setState({ showSideBar: false })
    }
 }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      const { location: { pathname } } = this.props;
      this.handleChangeStatus(this.getIndexRouter(pathname));
    }
  }

  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );


  handleChangeStatus(index) {
    const { menu } = this.state;
    const newMenu = menu.map((e,indexItem) => {
        return {
          ...e,
          active:index == indexItem ?  true : false,
        }
    });
    this.setState({ menu: newMenu});
  }

  refeshRoute(type) {
    if (type == 'change_route') {
      this.handleChangeStatus(1);
    }
  }

  mobileSidebarToggle(e) {
    e.preventDefault();
    const { showSideBar } = this.state;
    this.setState({ showSideBar: !showSideBar });
  }

  render() {
    const {
      menu,
      showSideBar,
      showModalLogout,
      shouldCheckLocalStorage,
    } = this.state;
    const { history } = this.props;
    return (
      <div style={{ backgroundColor: '#F5F6F9' }} className="app header-fixed sidebar-fixed aside-menu-fixed sidebar-lg-show">
        <AppHeader style={{ padding: 0, zIndex: 200, position: 'fixed' }} fixed>
          <Suspense fallback={this.loading()}>
            <DefaultHeader  onMenu={(e) => this.mobileSidebarToggle(e)} history={history} />
          </Suspense>
        </AppHeader>
        <div className="app-body">

          <AppSidebar fixed display="sm" style={{ backgroundColor: 'white', marginLeft: showSideBar ? 0 : -230 }}>
            <Suspense fallback={this.loading()}>
              <div className="flex_col">
                {menu.map((e, index) => {
                  return (
                    <Menu
                      key={e.title}
                      active={e.active}
                      data={e}
                    />
                  );
                })}
              </div>
            </Suspense>
          </AppSidebar>

          <main className="main" style={{ marginLeft: showSideBar ? 230 : 0}}>
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch>
                  {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        render={props => <route.component
                          shouldCheckLocalStorage={shouldCheckLocalStorage}
                          otherFunction={(type) => this.refeshRoute(type)} {...props} />
                        }
                      />
                    ) : null;
                  })}
                  <Redirect from="/" to="/login" />
                </Switch>
              </Suspense>
            </Container>
          </main>
        </div>
      </div >
    );
  }
}

export default withRouter(Applications);
