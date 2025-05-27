const PostCard = (props) => {
  return (
    <div
      className="PostCard"
      style={{
        borderRadius: "8px",
        padding: "15px",
        width: "250px",
        backgroundColor: "rgba(147, 147, 147, 0.55)",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "20px 0 10px",
          }}
        >
          <img
            src={props.imageURL}
            alt={props.name}
            style={{
              width: "70px",
              height: "70px",
              objectFit: "cover",
              borderRadius: "50%",
            }}
          />
        </div>

        <div style={{ textAlign: "center", padding: "0 15px 15px" }}></div>
        <div
          style={{
            textAlign: "center",
            padding: "0 15px 15px 15px",
          }}
        >
          {/* <h2>Harkirat Singh</h2> */}
          <h2 style={{ margin: "0 0 4px 0" }}>{props.name}</h2>
          <h3>{props.subtitle}</h3>
          <div
            style={{
              borderTop: "1px solid #e0e0e0",
            }}
          >
            {" "}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px 15px",
                alignItems: "center",
              }}
            >
              <span>Profile Viewers</span>
              <span>{props.profileviewers}</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px 15px",
              }}
            >
              <span>Post Impressions</span>
              <span>{props.postimpressions}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
