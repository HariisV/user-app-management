import React from 'react';
import ReactDOM from 'react-dom/client';
import merge from 'lodash/merge';

import { BrowserRouter } from 'react-router-dom';
import enConfig from 'tdesign-react/es/locale/en_US';

import { ConfigProvider } from 'tdesign-react';
import { Toaster } from 'react-hot-toast';

import RoutesList from './const/routes.tsx';

import './index.css';
import 'tdesign-react/es/style/index.css'; // global design variables
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const globalConfig = merge(enConfig, {
  image: {
    errorText: '이미지 로딩 실패',
    loadingText: '로딩...',
  },
});
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DndProvider backend={HTML5Backend}>
      <ConfigProvider globalConfig={globalConfig}>
        <Toaster />
        <BrowserRouter>
          <RoutesList />
        </BrowserRouter>
      </ConfigProvider>
    </DndProvider>
  </React.StrictMode>
);
