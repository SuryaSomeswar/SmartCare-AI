import { Link } from "react-router-dom";

function DashboardCards({
title,
value,
icon,
}) {
let path = "/";

if (title === "Doctors") {
path = "/doctors";
}

if (title === "Appointments") {
path = "/history";
}

if (title === "Users") {
path = "/users";
}

const gradients = {
Doctors:
"linear-gradient(135deg,#2563eb,#3b82f6)",
Appointments:
"linear-gradient(135deg,#10b981,#22c55e)",
Users:
"linear-gradient(135deg,#8b5cf6,#a855f7)",
};

return (
<div
style={{
background:
gradients[title] ||
"linear-gradient(135deg,#2563eb,#3b82f6)",
color: "white",
padding: "25px",
borderRadius: "22px",
minWidth: "260px",
flex: 1,
boxShadow:
"0 15px 35px rgba(0,0,0,0.15)",
}}
>
<div
style={{
display: "flex",
justifyContent:
"space-between",
alignItems: "center",
}}
> <div>
<p
style={{
margin: 0,
opacity: 0.9,
fontSize: "14px",
}}
>
Total {title} </p>

```
      <h1
        style={{
          margin:
            "10px 0 0 0",
          fontSize: "42px",
        }}
      >
        {value}
      </h1>
    </div>

    <div
      style={{
        fontSize: "50px",
        opacity: 0.9,
      }}
    >
      {icon}
    </div>
  </div>

  <Link to={path}>
    <button
      style={{
        marginTop: "20px",
        width: "100%",
        background:
          "rgba(255,255,255,0.2)",
        color: "white",
        border:
          "1px solid rgba(255,255,255,0.3)",
        padding: "12px",
        borderRadius: "12px",
        cursor: "pointer",
        fontWeight: "bold",
      }}
    >
      View {title}
    </button>
  </Link>
</div>
```

);
}

export default DashboardCards;
