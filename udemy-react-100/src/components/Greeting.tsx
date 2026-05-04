type GreetingProps = {
  name: string;
};

function Greeting(props: GreetingProps) {
  return (
    <div>
      <p>こんにちは、{props.name}さん！</p>
    </div>
  );
}

export default Greeting;
