import LoginForm from "../Components/LoginForm";
import NavigationBar from "../Components/NavigationBar";
import Footer from "../Components/Footer";
export default function Login(props) {
  const { primaryColorHandeler, color } = props;
  return (
    <div>
      <NavigationBar
        primaryColor={color}
        primaryColorHandeler={primaryColorHandeler}
      />
      <LoginForm />
      <Footer />
    </div>
  );
}
