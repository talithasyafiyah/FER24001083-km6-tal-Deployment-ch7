import React from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin as Google } from "@react-oauth/google";
import { googleLogin } from "../redux/actions/authActions";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

function GoogleLogin({ buttonText }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <>
      <Google
        width="160px"
        longtitle="true"
        shape="pill"
        type="standard"
        text="signin"
        locale="english"
        logo_alignment="center"
        onSuccess={(credentialResponse) =>
          dispatch(googleLogin(credentialResponse, navigate))
        }
        onError={(error) => {
          toast.error(error);
        }}
      />
    </>
  );
}

export default GoogleLogin;
