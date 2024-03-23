import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from 'react-router-dom';
import { authenticateUser } from "../dashboard/DatabaseReq";
import Alert from '@mui/material/Alert';
import LinearProgress from '@mui/joy/LinearProgress';


const useStyles = makeStyles(theme => ({
    root: {
        height: "100vh"
    },
    image: {
        backgroundImage: "url(https://source.unsplash.com/random)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center"
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        // width: "100%", // Take up the entire space within the Grid item

    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    },

}));

function Signin() {
    const [alert, setAlert] = useState(null);
    const [Loading, setLoading] = useState(null);
    const [checkMsg, setCheckMsg] = useState(null)
    const classes = useStyles();
    let Navigate = useNavigate(true);
    const [user, setUser] = useState({
        Username: "",
        Password: ""
    });
    async function handleSignIn() {
        setLoading(true);
        let userNoteData = await authenticateUser(user);
        console.log(userNoteData)
        setLoading(false)

        if (userNoteData) {
            setAlert(true)
            setTimeout(() => {
                Navigate('/app', { state: user.Username });
            }, 2000)

        }
        else {
            setAlert(false);
        }

    }
    function handleChange(event) {
        let type = event.target.id;
        let name = event.target.value;
        setUser((prev) => {
            return {
                ...prev, [type]: name
            }
        });
    }
    return (
        <div>
            {alert === false ? <Alert severity="error">Access Denied.</Alert> : null}
            {alert === true ? <Alert severity="success">Access Granted.</Alert> : null}

            < Grid container component="main" className={classes.root} >

                <CssBaseline />
                <Grid item xs={false} sm={4} md={7} className={classes.image} />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>

                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <form className={classes.form} noValidate>
                            <TextField
                                onChange={handleChange}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="Username"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                onChange={handleChange}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="Password"
                                autoComplete="current-password"
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button

                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={handleSignIn}
                            >
                                Sign In

                            </Button>
                            {
                                Loading ? <LinearProgress
                                    color="neutral"
                                    size="sm"
                                    variant="soft"
                                    thickness={2}
                                /> : null
                            }
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="/signup" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Box mt={5}>

                            </Box>
                        </form>
                    </div>
                </Grid>
            </Grid >
        </div>

    );

};


export default Signin;
