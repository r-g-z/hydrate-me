const Footer = () => {
  useEffect(() => {
    fetch(`/users/profile`, {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((userData) => {
        setUser(userData);
      });
  }, []);

  return (
    <div>
      <Link to="/logs">Water Logs</Link>
      <Link to="/user">Profile</Link>
    </div>
  );
};

export default Footer;
