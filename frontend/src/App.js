import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  OpinionList,
  OpinionDetail,
  OpinionRegister,
} from "./components/login/opinion";
import { StockPage, StockList } from "./components/login/stocks";
import { NewsList, NewsDetail } from "./components/login/news";
import { Home } from "./components/login/home";
import { Search } from "./components/login/search";
import { MyPage, Withdrawal } from "./components/login/my_page";
import { PortfolioPage } from "./components/login/portfolio";
import { SignIn, SignUp, FindPassword } from "./components/non_login/auth/Auth";
import { Welcome } from "./components/non_login/welcome";
import { FirstInvestProfile } from "./components/non_login/first_invest_profile";
import { AssetProvider, StockProvider } from "./context";
import axios from "axios";

const App = () => {
  return (
    <Router>
      <Switch>
        <AssetProvider>
          <StockProvider>
            <Route
              exact
              path="/auth/signIn"
              render={(props) => (
                <React.Fragment>
                  <SignIn />
                </React.Fragment>
              )}
            />
            <Route
              exact
              path="/auth/findPassword"
              render={(props) => (
                <React.Fragment>
                  <FindPassword />
                </React.Fragment>
              )}
            />
            <Route
              exact
              path="/auth/signUp"
              render={(props) => (
                <React.Fragment>
                  <SignUp />
                </React.Fragment>
              )}
            />
            <Route
              exact
              path="/auth/investProfile"
              render={(props) => (
                <React.Fragment>
                  <FirstInvestProfile />
                </React.Fragment>
              )}
            />
            <Route
              exact
              path="/"
              render={(props) => (
                <React.Fragment>
                  <Welcome />
                </React.Fragment>
              )}
            />
            <Route
              exact
              path="/home"
              render={(props) => (
                <React.Fragment>
                  <Home />
                </React.Fragment>
              )}
            />
            <Route
              exact
              path="/opinion"
              render={(props) => (
                <React.Fragment>
                  <OpinionList />
                </React.Fragment>
              )}
            />
            <Route
              exact
              path="/opinion/detail"
              render={(props) => (
                <React.Fragment>
                  <OpinionDetail />
                </React.Fragment>
              )}
            />
            <Route
              exact
              path="/opinion/write"
              render={(props) => (
                <React.Fragment>
                  <OpinionRegister />
                </React.Fragment>
              )}
            />
            <Route
              exact
              path="/news"
              render={(props) => (
                <React.Fragment>
                  <NewsList />
                </React.Fragment>
              )}
            />
            <Route
              exact
              path="/news/detail/:id"
              render={(props) => (
                <React.Fragment>
                  <NewsDetail {...props} />
                </React.Fragment>
              )}
            />
            <Route
              exact
              path="/search/:newsSearch"
              render={(props) => (
                <React.Fragment>
                  <Search {...props} />
                </React.Fragment>
              )}
            />
            <Route
              exact
              path="/mypage"
              render={(props) => (
                <React.Fragment>
                  <MyPage />
                </React.Fragment>
              )}
            />
            <Route
              exact
              path="/withdrawal"
              render={(props) => (
                <React.Fragment>
                  <Withdrawal />
                </React.Fragment>
              )}
            />

            <Route
              exact
              path="/stocklist"
              render={(props) => (
                <React.Fragment>
                  <StockList />
                </React.Fragment>
              )}
            />
            <Route
              exact
              path="/stock/detail/:symbol"
              render={(props) => (
                <React.Fragment>
                  <StockPage {...props} />
                </React.Fragment>
              )}
            />
          </StockProvider>
          <Route
            exact
            path="/portfolio"
            render={(props) => (
              <React.Fragment>
                <PortfolioPage />
              </React.Fragment>
            )}
          />
        </AssetProvider>
      </Switch>
    </Router>
  );
};
export default App;
