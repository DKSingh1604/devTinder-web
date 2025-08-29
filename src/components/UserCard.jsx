const UserCard = ({ user }) => {
  console.log("UserCard received user:", user);

  // Handle undefined user
  if (!user) {
    return (
      <div className="card bg-base-200 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title">Loading...</h2>
          <p>No user data available</p>
        </div>
      </div>
    );
  }

  // Handle nested data structure (if user.data exists)
  const userData = user.data || user;

  return (
    <div>
      <div className="card bg-base-200 w-96 shadow-sm">
        <figure>
          <img
            src={
              userData.photoUrl ||
              "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            }
            alt={userData.firstName || "User"}
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {userData.firstName} {userData.lastName}
          </h2>
          <h3>
            {userData.age || "Age NA!"}, {userData.gender || "Gender NA!"}
          </h3>
          <p>
            {userData.about ||
              "A card component has a figure, a body part, and inside body there are title and actions parts"}
          </p>
          <div className="card-actions justify-center my-4">
            <button className="btn btn-primary">Ignore</button>
            <button className="btn btn-secondary">Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
