import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Accounts from "./components/Accounts";
import Cards from "./components/Cards";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import { Layout } from "./components/Layout";
import SignUp from "./components/SignUp";
import SignIn from "./components/SingIn";
import LoginSignUpWrapper from "./LoginSignUpWrapper";
import ProtectedRoute from "./ProtectedRoute";
import Profile from "./components/Profile";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Layout>
        <Routes>
          <Route
            path="/"
            element={
              <LoginSignUpWrapper>
                <SignUp />
              </LoginSignUpWrapper>
            }
          />
          <Route
            path="/login"
            element={
              <LoginSignUpWrapper>
                <SignIn />
              </LoginSignUpWrapper>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/accounts"
            element={
              <ProtectedRoute>
                <Accounts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cards"
            element={
              <ProtectedRoute>
                <Cards />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
