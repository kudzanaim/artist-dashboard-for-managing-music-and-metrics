var FAQs = {
    markup: function(){
        var output = `
            <div class="FAQs">
                <h1 class="faq_hdr">Frequently Asked Questions</h1>
                <div class="question_container">
                    <div class="btn_container_faqs">
                        <div class="btn_quest_faq users_faq_ faq_btn_active" onclick="btn_click(this)">Music Listeners</div>
                        <div class="btn_quest_faq artists_faq_ " onclick="btn_click(this)">Artists & Labels</div>
                    </div>
                    <div class="content_container_questions_"></div>
                </div>
            </div>
        `;
        return output
    },
    nav: function(){
        var output = `
        <nav class="navmain navFAQ">
            <article class="logoMain">
                <img class="logomain_item" src="/assets/icon/strma_logo.png" onclick="nav_logo_click()">
            </article>
            <span class="cont_nav_item_lndg_" >
                <article class="navitem_main" onclick="landing_navClick(this)">FAQs</article>
                <article class="navitem_main" onclick="landing_navClick(this)">Our Story</article>
                <article class="navitem_main artcor_btn_landng" onclick="landing_navClick(this)">Artist Corner</article>
                <article class="navitem_main user_reg_btn_lndg_" onclick="landing_navClick(this)">Register Account</article>
            </span>
        </nav>
        `;
        return output
    },
    render: function(){
        // Get Questions array and page markup
        var nav = this.nav();
        var markup = this.markup();
        var questions = this.questions();

        // Append FAQ container
        $(".root").html(markup)
        $(".navigation").html(nav)

        // Add Body Class
        $(".App").addClass("body_main_");

        // Initial Render of questions 
        questions.map(function(item, index ){
            if( item.type == "Users"){
                var question_markup = FAQs.question_markup(item.question, item.answer)
                $(".content_container_questions_").append(question_markup)
            }
        })
    },
    clicked: function(type){
        // Get Questions
        var questions = this.questions();

        //  remove active
        $(".btn_quest_faq").removeClass("faq_btn_active");

        // Clear Questions Container
        $(".content_container_questions_").html("");

        // Render Questions function
        var render = function(type_){
            questions.map(function(item, index ){
                if( item.type == type_){
                    var question_markup = FAQs.question_markup(item.question, item.answer)
                    $(".content_container_questions_").append(question_markup)
                }
            })
        }

        // change active
        switch(type){
            case "Users":
                return $(".users_faq_").addClass("faq_btn_active"), render(type)
            case "Artists":
                return  $(".artists_faq_").addClass("faq_btn_active"), render(type)
        }
    },
    questions: function(){
        var array = [

            // User Questions
            { question:`How do I pay my subscription?`, answer:`
            In order to pay for your subscription, you need firstly ensure that you are a registered user. After that, you must 
            purchase a "Top Up Voucher" from the spcified locations <span style="border-bottom: solid 1px white;">here,</span>. Once you 
            purchase your voucher, you must proceed to open your Strma Application on your phone, go to settings and select the option 
            "Top Up with Voucher". 
            `, type:`Users` },

            { question:`where do I purchase top Up voucher?`, answer:`
            Vouchers can purchased at the following supermarkets, ______________, or can be purchased online on this <span style="border-bottom: solid 1px white;">link</span>.
            `, type:`Users` },

            { question:`How much is the monthly subscription?`, answer:`
            The monthly subscription is $1.50 USD.
            `, type:`Users` },

            { question:`How do I download music to my phone?`, answer:`
            Strma does not do song downloads, but instead permits users to rent an unlimited selection of music of their choice on a monthly basis, given that 
            they have an active subscription. Users with active subscription are able to save their favourite songs and playlists on their phone for offline
            listening up until their subscription expires.
            `, type:`Users` },

            { question:`How do I contact support service?`, answer:`
            To contact support you can <a href="#">click here.</span>
            `, type:`Users` },

            { question:`Can I use Strma to listem to songs already on my phone?`, answer:`
            Currently not. But it is a feature we are introducing on the next version update of our App.
            `, type:`Users` },

            { question:`Why are there ads playing during songs?`, answer:`
            With Strma, a user can listen to music on either a paid subscription or a free plan. In order for Strma to provide the free plan for our users, we have partnered with, various businesses
            who in-exchange for adverts, have paid for the users listening time, whilst their on the free plan. But for those on the paid plan, there are no ad interuptions during their
            listening experience.
            `, type:`Users` },

            { question:`Can I buy or download songs?`, answer:`
            Strma does sell music in exchange for downloads. Strma allows users to rent unlimited music for a small monthly subscription. With a paid account, users can listen & save unlimited songs
            and playlists to their phone for offline listening.
            `, type:`Users` },

            // Artists Questions
            { question:`What is Artist Corner?`, answer:`
            Artist Corner is a platform for artists and Labels to manage their music. The Artist dashboard allows users to easily upload, edit and delete their music. Other 
            features include, metrics for song and album perfomance, meaning as an artists you will know how many listens and roaylties your songs have earned. the biggest feature of dashboard is, 
            artists can control how they want to be paid, by editing their artist profile details.
            `, type:`Artists` },

            { question:`How do I get paid as an artist?`, answer:`
            In order to get paid as an artist, firstly you must have a registered Strma Artist Account. Secondly, you need to have submitted your payment details and preffered mobile wallet of choice.
            By mobile wallet we are reffering to services such as, Eco-Cash, One Wallet and Telecash. Artists can provide their payment details through the Artist Corner Dashboard.
            `, type:`Artists` },

            { question:`How do I see my musics perfomance?`, answer:`
            In order to track your musics performance, you must firstly have a registered Strma Artist Corner Account. Once registered, you can login to your Artist Dashboard where you will be 
            presented with a summary of tota metrics of all your musics performance, over various periods of time.
            `, type:`Artists` },

            { question:`How do I know how much money i earned from my music?`, answer:`
            Artists can find out how much money their music has accrued by frequently checking their Artist Dashboard account. In order to access the Dashboard, one must be a registered 
            Strma Artist.
            `, type:`Artists` },

            { question:`How do I get my music onto Strma?`, answer:`
            Artists can easily submit their music, by firstly registering a Strma Artist Account.Once registered artists can then login into his/her dashboard accunt where they can 
            access upload widget for Albums and singles.  
            `, type:`Artists` }

        ];
        return array
    },
    question_markup: function(questions, answers){
        var markup = `
            <div class="question_item_">
                <h1 class="question_header" onclick="open_item(this)">`+questions+`</h1>
                <div class="q_answer">
                    <p>`+answers+`</p>
                </div>
            </div>
        `;
        return markup
    },
    click: function(param){
        if( $($(param)[0].parentElement).find(".q_answer").css("display") != "none" ) {
            $($(param)[0].parentElement).find(".q_answer").toggle() 
        }
       else{
            // Close all open tabs
            $(".q_answer").css("display", "none")

            // Unhighlight b4
            $(".question_header").css({"border-left":"", "background": "", "color": "", "font-family": "", "font-weight": "", "letter-spacing": "" })

            // Highlight Selected
            $(param).css({    "border-left": "solid 2px white", "background": "rgb(4, 123, 79)", "color": "#9affde", "font-family": "roboto", "font-weight": "400", "letter-spacing": "1px" })
            
            return $($(param)[0].parentElement).find(".q_answer").toggle()
       }
    }
}

window.FAQs = FAQs;
window.btn_click = function(param){

    // Get Type
    var type = $(param).text();

    switch (type) {
        case "Music Listeners":
            return FAQs.clicked("Users")
        case "Artists & Labels":
            return FAQs.clicked("Artists")
    }
}
window.open_item = function(param){
    return FAQs.click(param)
}