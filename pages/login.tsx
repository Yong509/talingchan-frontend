import CustomAppBar from "components/common/custom_app_bar";
import type { NextPage } from "next"
// import '../styles/login.css'
import Box from '@mui/material/Box';

import LoginForm from "components/login/login_form";

const Login: NextPage = (props) => {
    return (
        <>
            <div className="bg-white">
                <div className="w-full">
                    <CustomAppBar
                        title="Talingchan Fertilizer"
                        id={"LoginBar"}
                    /><div className="pt-44">
                    </div>
                    <div className="body-login">
                        <Box
                            component="img"
                            sx={{
                                flexGrow: 1, display: { xs: "none", sm: "block" }
                            }}
                            src="https://media.discordapp.net/attachments/868566019193577522/888083023105503282/template.jpg"
                            maxWidth="50%"
                        />
                        <LoginForm/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;