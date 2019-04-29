var Terms = {
    render: function(){

        // Get Markup
        var container = this.page_container();
        var footer = this.footer();

        // Append Page Container
        $(".root").html(container).removeClass("about");

        // Load Page to Container
        $(".page_terms").load("/terms.html");

        // Append footer
        $(".terms_footer").append(footer);

        // Modify Background of terms page header
        ( $(".navigation").find(".navmain ").length >= 1 ) ?
            /*if true*/     ( $(".navmain").addClass("navFAQ"), $(".terms_container").css("padding-top","15vh") ) : 
                        /*if false*/     $(".loginNav").addClass("terms_Header_mobile");
        $(".logo_art").css("padding-top", "2%")
        
    },
    footer: function(){
        var output = `
        <div class="footer_mobile footer_terms_mobile">
            <div class="footerItem_login" onclick="hme()">© Strma, Inc.</div>
            <div class="footerItem_login about_btn" onclick="about()">About</div>
            <div class="footerItem_login" onclick="footerClick(this)">Terms of Service</div>
            <a class="footerItem_login" href="https://www.facebook.com" target="_blank"><img class="footer_icon" src="/assets/icon/facebook.png"></a>
            <a class="footerItem_login" href="https://www.instagram.com" target="_blank"><img class="footer_icon" src="/assets/icon/instagram.png"></a>
        </div>
        `;
        return output
    },
    page_container: function(){
        var output = `
            <div class="terms_container terms">
                <div class="page_terms"></div>
                <div class="terms_footer"></div>
            </div>
        `;
        return output
    },
    hme:function(){
        // Previous & Current Page
        var prevPage = sessionStorage.getItem("PreviousPage");
        var current = sessionStorage.getItem("CurrentPage");      

        // Render based on current page
        if(current == "Login"){
            return Router.Router("Landing")
        }
        else{
        // Render based on previous page
        switch(prevPage){
            case "Listen to Zim Music":
                return Router.Router("Landing")
            case "Login":
                return Router.Router("Artist Corner"), $(".loginRoot").addClass("body-login-main")
        }
        }
    }
}

window.hme = function(){
    return Terms.hme()
}

window.footerClick = function(param){
    var item = $(param).text().trim();
    return RouterObject.Router(item)
}

window.Terms = Terms;