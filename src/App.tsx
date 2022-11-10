import rootReducer, { rootSaga } from './stores';
import createSagaMiddleware from "redux-saga";
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from "react-router-dom";
import HotelListContainer from "./containers/Hotel/HotelListContainer";
import LoginContainer from "./containers/Login/LoginContainer";
import DetailFormContainer from "./containers/Commons/DetailFormContainer";
import NotifyTemplateListContainer from "./containers/NotifyTemplate/NotifyTemplateListContainer";
import NotifyTemplateDetailContainer from "./containers/NotifyTemplate/NotifyTemplateDetailContainer";
import NotifyChannelListContainer from "./containers/NotifyChannel/NotifyChannelListContainer";
import NotifyChannelDetailContainer from "./containers/NotifyChannel/NotifyChannelDetailContainer";
import SpinContainer from "./containers/Commons/SpinContainer";
import DashboardMainContainer from './containers/Dashboard/DashboardMainContainer';
import NotFound from './components/Commons/NotFound';
import DoorlockAllListContainer from './containers/Doorlock/DoorlockAllListContainer';
import DoorlockAllDetailContainer from './containers/Doorlock/DoorlockAllDetailContainer';

const App = () => {
  const persistConfig = {
    key: 'root',
    whitelist: ['header', 'sidebar', 'breadcrumb', 
    'hotelList', 'staffList', 'roomList', 'reportList', 'notifyTemplateList', 'hotelnotifyList',
  'floorList', 'doorlockLogList', 'doorlockBatteryList', 'doorlockList', 'buildingList', 'bookingList',
  'doorlockAllList'], //List 관련 필터는 저장
    storage
  };
  
  const enhancedReducer = persistReducer(persistConfig, rootReducer);
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    enhancedReducer, 
    composeWithDevTools(applyMiddleware(sagaMiddleware))
  );
  
  sagaMiddleware.run(rootSaga);
  
  const persistor = persistStore(store);
  
  return (
    <>
        <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            {/* 로딩(스핀) 과 라우터 부분 시작 */}
            <SpinContainer />
            <Routes>
                <Route path="/" element={<LoginContainer />} />
                <Route path="/login" element={<LoginContainer />} />
                <Route path="/dashboard" element={<DashboardMainContainer />} />
                <Route path="/hotel" element={<HotelListContainer />} />
                <Route path="/hotel/:id">
                    <Route index element={<DetailFormContainer />} />
                    {/* <Route path="/building" element={<BuildingListContainer />} /> */}
                </Route>
                <Route path="/notify_template" element={<NotifyTemplateListContainer />} />
                <Route path="/notify_template/:id" element={<NotifyTemplateDetailContainer />} />
                <Route path="/notify_channel" element={<NotifyChannelListContainer />} />
                <Route path="/notify_channel/:id" element={<NotifyChannelDetailContainer />} />

                <Route path="/doorlock" element={<DoorlockAllListContainer />} />
                <Route path="/doorlock/:id" element={<DoorlockAllDetailContainer />} />
                <Route path="/*" element={<NotFound />} />
            </Routes>
            {/*  끝 */}
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;