var About = {
    render: function(){

        // Get MarkUp
        var markup = this.markup();

        // Change title and URL
        window.history.pushState(null, null, "/About US");
        $(document).prop('title', `Strma | About Us`);     
        
        // Darken NAv
        $(".navmain").addClass("navFAQ");

        // Render Page
        $(".root").html(markup)

        // Correct Padding if on Landing
        return ( $(".navigation").find(".loginNav").length <= 0)  ? $(".about_page").css({ "padding-top": "20vh", "overflow-y": "scroll"}) : null;
        
    },
    markup: function(){
        var output = `
            <div class="about_page">

                        <div class="about_page_content">
                            <h1 class="about_h">About Us</h1>
                            <p class="about_p">With Strma it is easy to find your favourite Zimbabwean music, whilst enjoying the ability 
                            to discover new artists and playlists right on your mobile phone.<br />
                            <br />
                            Strma is offers a deep library of african music, so whether you're in search of <span class="features_abt">Zim-Dancehall</span>, 
                            <span class="features_abt">Gospel</span> or<span class="features_abt"> Sungura</span>, the music is always right at your fingertips.
                             Create your own <span class="features_abt">playlists</span> and choose what you
                            want to listen to. Staying up to date with latest Album releases and riddims from your favourite artists
                            is now made easy with Strma. <br />
                            <br />
                            Soundtrack your life with Strma. Subscribe or listen for free.
                            </p>
                            <h1 class="about_h">Strma Artist Corner</h1>
                            <p class="about_p">Artist Corner is a specially designed platform for Artists, Producers & Record Labels to manage
                            their music portfolio on Strma. With Artist Corner, Users can monitor how their music is perfoming
                            through key metrics such <span class="features_abt">"Total Streams"</span>, 
                            <span class="features_abt">"Weekly Streams"</span> and <span class="features_abt">"Total Royalty Earnings"</span>.
                             The artist dashboard also allows artists to Upload Singles & Albums, Edit Songs, manage their profile account 
                            details.<br />
                            <br />
                            The most important feature of the artist dashboard is that Artists can <span class="features_abt">provide their payment details
                             such that they can receive payment</span> for their music streams & downloads. Payments will be sent though 
                             the artists mobile Wallet of choice (e.g. EcoCash or One Wallet).
                            </p>
                            <h1 class="about_h">Operations and Partners</h1>
                            <p class="about_p">
                            Currently Strma operates in Zimbabwe, but offers its service to users in South Africa, Uk, Canada, Australia,
                            and Botswana. As a growing service we welcome users, artists and partners from across the world. If you
                            want to see the Strma service in your country, or partner with us to bring Strma to your community, or other business
                            iniatives, we invite you to reach out to our team.
                            </p>
                        </div>
                        <div class="about_contactUs">
                            <h1>Let's Talk</h1>
                            <div class="form_fields_about">
                                <div class="email_name_abt">
                                    <input class="name_about" placeholder="Name">
                                    <input class="email_about" type="email" placeholder="Email/Phone">
                                </div>
                                <input class="subject_about" placeholder="Subject">
                                <textarea class="message_about" placeholder="Your Message"></textarea>
                            </div>
                            <div class="send_btn_about">Send</div>
                        </div>

            </div>
        `;
        return output
    }
}

window.about = function(){
    return About.render()
}

window.About = About;
