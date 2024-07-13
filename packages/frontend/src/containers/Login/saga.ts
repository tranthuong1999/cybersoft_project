import { PayloadAction } from '@reduxjs/toolkit';
import { put, takeEvery } from 'redux-saga/effects';
import { STATUS_CODE } from '../../constants/common';
import AuthenticationService from '../../services/AuthenticationService';
import { setErrorMessages, setSuccessMessages } from '../Global/reducer';
import { loginRequest, loginSuccess, loginFail } from './reducer';
import { LoginForm } from '../../types/Requests';

function* loginFlow(data: PayloadAction<LoginForm>) {
  try {
    const response = yield AuthenticationService.login(data.payload);

    if (response.status === STATUS_CODE.SUCCESS) {
      const { type } = loginSuccess;
      yield put({
        type,
        payload: response.data,
      });
      yield put({ type: setSuccessMessages.type, payload: ['Login success.'] });
    } else {
      yield put({ type: loginFail.type });
    }
  } catch (error) {
    yield put({
      type: setErrorMessages.type,
      payload: [error.response.data.message],
    });
    yield put({ type: loginFail.type, payload: error.response.data.message });
  }
}

function* loginWatcher() {
  yield takeEvery(loginRequest, loginFlow);
}

export default loginWatcher;
