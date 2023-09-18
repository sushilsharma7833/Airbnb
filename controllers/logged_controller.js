class logged_user {
  static homepage = async (req, res) => {
    console.log("logged user is at homepage");
    //  in userController -- home page is redered so we use redirect
    return res.redirect("home");
  };

  static admin = (req, res) => {
    return res.render("admin")
  };

  static hoster = (req, res) => {
    return res.render("hoster");
  };

  static hoster_curd = (req, res) => {
    return res.render("hoster_curd");
  };
  static Adduser = (req, res) => {
    return res.render("addNewUser");
  };

  static help = (req, res) => {
    return res.render("help");
  };

  static booking_conf = (req, res) => {
    return res.render("booking_conf");
  };

  static property = (req, res) => {
    return res.render("property");
  };
}

export default logged_user;
