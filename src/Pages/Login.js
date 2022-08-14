
import LoginForm from "../Components/LoginForm";
import NavigationBar from "../Components/NavigationBar";

export default function Login(props) {
  const { primaryColorHandeler, color } = props;
  return (
    <div>
      <NavigationBar primaryColor={color} primaryColorHandeler={primaryColorHandeler}/>
      <LoginForm/>
      <Footer />
    </div>
  );
}
