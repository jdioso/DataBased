import React from 'react';
import "../styles/Login.css"; 

function Login()
{
    return(
        <div class='wrapper-login d-flex align-items-center justify-content-center'>
            <div class='container align-items-center justify-content-center' id="loginDiv" data-aos="fade">
                <form>
                    <center><span id= "title">LOGIN</span></center>
                    <center><input type="text" id="formInput" placeholder="USERNAME"/><br /></center>
                    <center><input type="password" id="formInput" placeholder="PASSWORD"/><br /></center>
                    <center><input type="submit" id="formButton" class="buttons" value="LOGIN"/></center>
                </form>
            </div>
        </div>
    );
};

export default Form;