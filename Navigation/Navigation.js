

// d. navigation blueprint
var Navigation = {
    constructor: function(){
        // a. Navigation Array
        this.nav = [
            { title: "Log Out", link: "", style: "myAccount ripple", focus: false, onclick: "navClicked(this)" },
            { title: "My Account", link: "", style: "navItem logOut", focus: false, onclick: "navClicked(this)" },
            { title: "Payment Settings", link: "", style: "navItem", focus: false, onclick: "navClicked(this)" },
            { title: "My Music", link: "", style: "navItem", focus: false, onclick: "navClicked(this)" },
            { title: "strma.", link: "", style: "Logo", focus: false, onclick: "navClicked(this)" }
        ]
        // b. Get Navigation Array
        this.getNavItems = function() {
            return this.nav
        }
        // c. On navItem Click
        this.navClicked = function(e) {
            var itemName = $(e).text();
            // alert(  itemName.trim() == "My Account".trim()) 
            if( itemName.trim() != "strma." && itemName.trim() != "Log Out".trim()){
                // i. remove any prior styling
                $(".navItem").removeClass("navActive");
                // ii. Add active class style
                $(e).addClass("navActive");
                // iii. Call Router
                RouterObject.Router(itemName.trim())
            }
            else{
                // i. Call Router
                RouterObject.Router(itemName.trim())
            }
        }
    },
    initalNavState: function(){
        var state = [
            { title: "Log Out", link: "", style: "myAccount", focus: false, onclick: "navClicked(this)" },
            { title: "My Account", link: "", style: "navItem logOut", focus: false, onclick: "navClicked(this)" },
            { title: "Payment Settings", link: "", style: "navItem", focus: false, onclick: "navClicked(this)" },
            { title: "My Music", link: "", style: "navItem", focus: false, onclick: "navClicked(this)" },
            { title: "strma.", link: "", style: "Logo", focus: false, onclick: "navClicked(this)" }
        ]
        return state
    }
}

var landingNavigation = {
    // c. On navItem Click
    navClicked: function(e){
        var itemName = $(e).text();

        if( itemName.trim() !="" || itemName.trim() != undefined){
            // i. Call Router
            RouterObject.Router(itemName.trim())
        }
        else{
            // i. Call Router
            RouterObject.Router(itemName.trim())
        }
    }
}

var landing_navClick = function(param){
    return landingNavigation.navClicked(param)
}

window.Navigation = Navigation;
window.landingNavigation = landingNavigation;
window.landing_navClick = landing_navClick;
