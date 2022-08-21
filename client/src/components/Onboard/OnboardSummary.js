import Onboard from "./Onboard";

function OnboardSummary(props) {
  fetch(`/users/profile`, {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      props.onSuccessSubmit();
    });

  return (
    <div>
      <h1>hi goal</h1>
    </div>
  );
}

export default OnboardSummary;
