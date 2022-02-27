import "./css/signup.css";
import React, { useState } from "react";
import axios from "axios";
import hash from "hash.js";
import * as EmailValidator from "email-validator";
import {
  Box,
  TextField,
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Alert,
  SelectChangeEvent,
} from "@mui/material";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import isInteger from "is-sn-integer";
import queryString from "query-string";
import { useNavigate } from "react-router";
import { useMenu } from "../components/MenuProvider";
import { useWidth } from "../components/ContextProvider";
import { severity } from "../lib/common";
import MetahkgLogo from "../components/logo";
declare const hcaptcha: { reset: (e: string) => void };
/*
 * Sex selector
 * props.disabled: set the Select as disabled if true
 * props.changeHandler: callback to use when user changes selection
 */
function SexSelect(props: {
  sex: "M" | "F" | undefined;
  setSex: React.Dispatch<React.SetStateAction<"M" | "F" | undefined>>;
  disabled: boolean;
}) {
  const { sex, setSex, disabled } = props;
  const onChange = (e: SelectChangeEvent<string>) => {
    setSex(e.target.value ? "M" : "F");
  };
  return (
    <FormControl sx={{ minWidth: 200 }}>
      <InputLabel color="secondary">Sex</InputLabel>
      <Select
        color="secondary"
        disabled={disabled}
        value={sex}
        label="Sex"
        onChange={onChange}
      >
        <MenuItem value={1}>Male</MenuItem>
        <MenuItem value={0}>Female</MenuItem>
      </Select>
    </FormControl>
  );
}
/*
 * Register component for /register
 * initially 3 text fields and a Select list (Sex)
 * When verification is pending
 * (waiting for user to type verification code sent to their email address),
 * there would be another textfield alongside Sex for the verification code
 * a captcha must be completed before registering, if registering fails,
 * the captcha would reload
 * process: register --> verify --> account created -->
 * redirect to query.returnto if exists, otherwise homepage after verification
 * If user already signed in, he is redirected to /
 */
export default function Register() {
  document.title = "Register | Metahkg";
  const navigate = useNavigate();
  const [width] = useWidth();
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [sex, setSex] = useState<"M" | "F" | undefined>(undefined);
  const [disabled, setDisabled] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [htoken, setHtoken] = useState("");
  const [code, setCode] = useState("");
  const [alert, setAlert] = useState<{ severity: severity; text: string }>({
    severity: "info",
    text: "",
  });
  const [menu, setMenu] = useMenu();
  menu && setMenu(false);
  const query = queryString.parse(window.location.search);
  function verify() {
    setAlert({ severity: "info", text: "Verifying..." });
    setDisabled(true);
    axios
      .post("/api/verify", { email: email, code: Number(code) })
      .then((res) => {
        localStorage.user = user;
        localStorage.id = res.data.id;
        navigate(decodeURIComponent(String(query.returnto || "/")));
      })
      .catch((err) => {
        setAlert({ severity: "error", text: err.response.data.error });
        setDisabled(false);
      });
  }
  function register() {
    setAlert({ severity: "info", text: "Registering..." });
    setDisabled(true);
    if (!EmailValidator.validate(email)) {
      setAlert({ severity: "error", text: "Email invalid" });
      setDisabled(false);
      return;
    }
    if (user.split(" ")[1] || user.length > 15) {
      setAlert({
        severity: "error",
        text: "Username must be one word and less than 16 characters.",
      });
      setDisabled(false);
      return;
    }
    axios
      .post("/api/register", {
        email: email,
        user: user,
        pwd: hash.sha256().update(pwd).digest("hex"),
        sex: sex,
        htoken: htoken,
      })
      .then(() => {
        setWaiting(true);
        setAlert({
          severity: "success",
          text: "Please enter the verification code sent to your email address.\nIt will expire in 5 minutes.",
        });
        setDisabled(false);
      })
      .catch((err) => {
        setAlert({ severity: "error", text: err.response.data.error });
        setDisabled(false);
        setHtoken("");
        hcaptcha.reset("");
      });
  }
  if (localStorage.user) {
    navigate("/", { replace: true });
    return <div />;
  }
  return (
    <Box
      className="signup-root flex fullwidth fullheight justify-center align-center"
      sx={{
        backgroundColor: "primary.dark",
      }}
    >
      <Box
        className="signup-main-box"
        sx={{
          width: width < 760 ? "100vw" : "50vw",
        }}
      >
        <div className="signup-main-div">
          <div className="flex justify-center align-center">
            <MetahkgLogo svg light height={50} width={40} className="mb10" />
            <h1 className="signup-title-text mb20">Register</h1>
          </div>
          {alert.text && (
            <Alert className="signup-alert mt10" severity={alert.severity}>
              {alert.text}
            </Alert>
          )}
          {[
            { label: "Username", set: setUser, type: "text" },
            { label: "Email", set: setEmail, type: "email" },
            { label: "Password", set: setPwd, type: "password" },
          ].map((item) => (
            <TextField
              className="mb20"
              sx={{ input: { color: "white" } }}
              color="secondary"
              disabled={waiting}
              variant="filled"
              type={item.type}
              onChange={(e) => {
                item.set(e.target.value);
              }}
              label={item.label}
              required
              fullWidth
            />
          ))}
          <div className={width < 760 ? "" : "flex"}>
            <SexSelect disabled={waiting} sex={sex} setSex={setSex} />
            {width < 760 ? <br /> : <div />}
            <div
              className={`flex fullwidth justify-${
                width < 760 ? "left" : "flex-end"
              }`}
            >
              {waiting && (
                <TextField
                  color="secondary"
                  className={width < 760 ? "mt20" : ""}
                  variant="filled"
                  label="verification code"
                  onChange={(e) => {
                    setCode(e.target.value);
                  }}
                />
              )}
            </div>
          </div>
          <br />
          <div className={width < 760 ? "" : "flex fullwidth"}>
            <div className="flex justify-left fullwidth">
              <HCaptcha
                theme="dark"
                sitekey="adbdce6c-dde2-46e1-b881-356447110fa7"
                onVerify={(token) => {
                  setHtoken(token);
                }}
              />
            </div>
            <div
              className={`flex justify-${
                width < 760 ? "left" : "flex-end"
              } align-center fullwidth ${width < 760 ? "mt20" : ""}`}
            >
              <Button
                disabled={
                  disabled ||
                  (waiting
                    ? !(code && isInteger(code) && code.length === 6)
                    : !(htoken && user && email && pwd && sex))
                }
                type="submit"
                className="signup-submit-btn"
                color="secondary"
                variant="contained"
                onClick={waiting ? verify : register}
              >
                {waiting ? "Verify" : "Register"}
              </Button>
            </div>
          </div>
        </div>
      </Box>
    </Box>
  );
}
