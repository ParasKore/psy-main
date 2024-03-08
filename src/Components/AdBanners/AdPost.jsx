export default function AdPost(props) {
  return (
    <div className="p-3 flex rounded-md justify-center">
      <a href={props.data.link} target="_blank">
        <img className="rounded-lg" src={props.data.imgURL} alt="" />
      </a>
    </div>
  );
}
