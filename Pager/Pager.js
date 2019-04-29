

// f. page changer
function Pager(){ 
        this.renderPage = function(page, additional_args){
            // Reset root background on page change
            $(".root").removeClass("regBackground");
            $(".root").removeClass("uploads");
            // Kill intervals
            clearInterval( window.form_listener )

            // a. determine pageName & render respective Page
            switch(page){
                case "My Music":
                    $(".App").attr("class", "App");
                    return MyMusic.render()
                case "Upload Music":
                    $(".App").attr("class", "App");
                    return Uploads.render(additional_args)
                case "Log Out":
                    $(".App").attr("class", "App");
                    return alert("User logged Out")
                case "My Account":
                    $(".App").attr("class", "App");
                    return MyAccount.render()
                case "strma.":
                    $(".App").attr("class", "App");
                    return Home.render()
                case "Landing":
                    $(".App").attr("class", "App");
                    $(".navigation").removeClass("mainNav");
                    $(".footer").removeClass("artist_corner_foot");
                    $(".App").addClass("body_main_");
                    return Landing.render()
                case "Payment Settings":
                    $(".App").attr("class", "App");
                    return myPayments.render()
                case "Terms of Service":
                    $(".App").attr("class", "App");
                    return Terms.render()
                case "Our Story":
                    $(".App").attr("class", "App");
                    return OurStory.render()
                case "FAQs":
                    $(".App").attr("class", "App");
                    return FAQs.render()
                case "Artist Corner":
                    $(".navigation").addClass("mainNav");
                    $(".App").attr("class", "App");
                    $("body").attr("class", "")
                    return artistCorner()
                case "Register Account":
                    $(".App").attr("class", "App");
                    return Register.render()
                case "Create Account":
                    return Landing.crt_user()
                case "Artist Sign-In":
                    return Login.renderMobileLogin()
                case "Artist Register":
                    return Login.renderMobileSignUp()
                default:
                    break 
            }
        }
}


window.Pager = Pager;