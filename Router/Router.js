

// e. router object
var Router = {

        history_object: {

            historyArray :[],
            ForwardArray :[],
            count : 0,
            saveState:function(){
                var current_state =  $(".App")[0].innerHTML;
                History_.historyArray.push(   JSON.stringify(  current_state)  );
                History_.count++;
            },
            goBack:function(){    
                try {
                    var prevPage = sessionStorage.getItem("PreviousPage");
                    var prev = sessionStorage.getItem("CurrentPage");
                    var current  = prevPage;    
                    var hist_length = History_.count;
                        
                        // Page Fixes Before load
                        if(prevPage == "Landing"){
                            $(".App").addClass("body_main_")
                        }

                        // ii. Get previos State and Append to Dom
                        var state_toGET = History_.historyArray[  (History_.count - 1)];
                        // $(".root").html("");
                        $(".App").html(    JSON.parse(state_toGET)    );
    
                        // iii. Push old current state to ForwardArray for Forward push
                        History_.ForwardArray.push(   History_.historyArray[History_.count - 1]  );
    
                        // iv. Update history Object
                        History_.historyArray.splice(  (History_.count - 1), 1);
                        History_.count--;                   
    
                        // vi. save page state
                        sessionStorage.setItem("PreviousPage", prev)
                        sessionStorage.setItem("CurrentPage", current)
    
                        // vii. Update URL
                        $(document).prop('title', `Strma | ${prevPage}`);

                        prevPage = ( sessionStorage.getItem("CurrentPage") == "Listen to Zim Music")? "/": prevPage;
                        history.pushState(null, null, prevPage);
                    
                } catch (error) {
                    console.log(error)
                }

            }

        },
        initHistory: function(title){
            (title == undefined)? history.pushState(null, null, "/"): null;
            // Listen for Back button click
            window.addEventListener('popstate', function(event) {
                
                // Capture Event on Back
                console.log(event)

                // Current Page to Sess. Storage
                var currentPage = sessionStorage.getItem("CurrentPage");
                
                // Save first Entry on Site Load
                history.pushState(null, null, currentPage);
                
                // Go Back to Last Entry
                if( History_.historyArray.length > 0){   History_.goBack()   }
            });
        },
        Router: function(clickedItem, additional_args){
           
            // i. Save current Page
            History_.saveState();

            // i. Quick Fixes
            $(".navmainReg").remove();
            $(".logoMain").removeClass("logoMain_disable")

            // ii. Save previous page
            var previousPage = sessionStorage.getItem("CurrentPage");
            sessionStorage.setItem("PreviousPage", previousPage);

            // iv. route page
            switch( clickedItem){
                
                case "My Music":
                    // i. Change Page
                    Pager_.renderPage(clickedItem);
                    // ii. Change Page Title
                    $(document).prop('title', `Strma Artist Corner | `+clickedItem+``);
                    // iii. save page state
                    sessionStorage.setItem("CurrentPage", "My Music");

                    return  window.history.pushState(null, null, "My-Music")
                
                case "Upload Music":
                    // i. Change Page
                    Pager_.renderPage(clickedItem, additional_args);
                    // ii. Change Page Title
                    $(document).prop('title', `Strma Artist Corner | `+clickedItem+``);
                    // iii. save page state
                    sessionStorage.setItem("CurrentPage", "Uploads");

                    return  window.history.pushState(null, null, "Uploads");
                
                case "Payment Settings":
                    // i. Change Page
                    Pager_.renderPage(clickedItem);
                    // ii. Change Page Title
                    $(document).prop('title', `Strma Artist Corner | `+clickedItem+``);
                    // iii. save page state
                    sessionStorage.setItem("CurrentPage", "Payment Settings");
                    
                    return  window.history.pushState(null, null, "Payment-Settings");
                
                case "Log Out":
                    // i. Change init and remove State
                    localStorage.clear();
                    // ii. Load Home Page
                    Login.sState();
                    // iii. Change Page Title
                    $(document).prop('title', `Strma Artist Corner | Login`);

                    return  window.history.pushState(null, null, "Login");
                
                case "My Account":
                    // i. Change Page
                    Pager_.renderPage(clickedItem);
                    // ii. Change Page Title
                    $(document).prop('title', `Strma Artist Corner | `+clickedItem+``);
                    // iii. save page state
                    sessionStorage.setItem("CurrentPage", "Account");
                        
                    return  window.history.pushState(null, null, "Account");
                
                case "FAQs":
                    // i. Change Page
                    Pager_.renderPage(clickedItem);
                    // ii. Change Page Title
                    $(document).prop('title', `Strma | `+clickedItem+``);
                    // iii. save page state
                    sessionStorage.setItem("CurrentPage", "FAQs");
                        
                    return  window.history.pushState(null, null, "FAQs");

                case "Our Story":
                    // i. Change Page
                    Pager_.renderPage(clickedItem);
                    // ii. Change Page Title
                    $(document).prop('title', `Strma | `+clickedItem+``);
                    // iii. save page state
                    sessionStorage.setItem("CurrentPage", "Our Story");
                        
                    return  window.history.pushState(null, null, "Our-Story");

                case "Terms of Service":
                    // i. Change Page
                    Pager_.renderPage(clickedItem);
                    // ii. Change Page Title
                    $(document).prop('title', `Strma | `+clickedItem+``);
                    // iii. save page state
                    sessionStorage.setItem("CurrentPage", "Terms");
                        
                    return  window.history.pushState(null, null, "Terms");
                
                case "strma.":
                    // i. Change Page
                    Pager_.renderPage(clickedItem);
                    // ii. Change Page Title
                    $(document).prop('title', `Strma Artist Corner | Home`);
                    // iii. save page state
                    sessionStorage.setItem("CurrentPage", "/");
                        return  window.history.pushState(null, null, "/");
                
                case "Artist Corner":
                    // i. Change Page
                    Pager_.renderPage(clickedItem);
                    // ii. Change Page Title
                    $(document).prop('title', `Strma Artist Corner | Login`);
                    // iii. save page state
                    sessionStorage.setItem("CurrentPage", "Login");
                    // iv. Clear Empty history object
                    // History_.historyArray.shift()
                    // History_.count--;

                        return  window.history.pushState(null, {}, "Login");

                case "Landing":
                    // i. Change Page
                    Pager_.renderPage(clickedItem);
                    // ii. Change Page Title
                    $(document).prop('title', `Strma | Listen to Zim Music`);
                    // iii. save page state
                    sessionStorage.setItem("CurrentPage", "Listen to Zim Music");
                        return  window.history.pushState(null, {}, "/");

                case "Register Account":
                    // i. Change Page
                    Pager_.renderPage(clickedItem);
                    // ii. Change Page Title
                    $(document).prop('title', `Strma | `+clickedItem+``);
                    // iii. save page state
                    sessionStorage.setItem("CurrentPage", "Register Account");
                        return  window.history.pushState(null, null, "register account");

                case "Create Account":
                    // i. Change Page
                    Pager_.renderPage(clickedItem);
                    // ii. Change Page Title
                    $(document).prop('title', `Strma | `+clickedItem+``);
                    // iii. save page state
                    sessionStorage.setItem("CurrentPage", "Register Account");
                        return  window.history.pushState(null, null, "47dSRt4gw/create/kws2eds");
                
                case "Artist Sign-In":
                    // i. Change Page
                    Pager_.renderPage(clickedItem);
                    // ii. Change Page Title
                    $(document).prop('title', `Strma | `+clickedItem+``);
                    // iii. save page state
                    sessionStorage.setItem("CurrentPage", clickedItem );
                        return  window.history.pushState(null, null, "03cWRg4pz/sign-in/eyO2eds");

                case "Artist Register":
                    // i. Change Page
                    Pager_.renderPage(clickedItem);
                    // ii. Change Page Title
                    $(document).prop('title', `Strma | `+clickedItem+``);
                    // iii. save page state
                    sessionStorage.setItem("CurrentPage", clickedItem );
                        return  window.history.pushState(null, null, "3j9Stpl/artist%reg/lsh9W3q");
                default:
                    return
            }

        }
}

// window.Router = Router;