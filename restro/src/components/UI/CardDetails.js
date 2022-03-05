import Card from 'react-bootstrap/Card'

export default function CardDetails(props){
    return (
      <Card style={{ width: "18rem", marginBottom: "15px" }}>
        <Card.Img
          style={{ height: "250px" }}
          variant="top"
          src={require(`../../assets/images/${props.item.id}.jpeg`)}
        />
        <Card.Body>
          <Card.Title>{props.item.name}, {props.item.place}</Card.Title>
          <Card.Text>
            <span>{props.item.desc}</span> 
            <span><strong>Price for two:</strong> Rs.{props.item.price}</span>
            <span><strong>Cuisine:</strong> {props.item.cuisine.join(",")}</span>
          </Card.Text>
        </Card.Body>
      </Card>
    );
}