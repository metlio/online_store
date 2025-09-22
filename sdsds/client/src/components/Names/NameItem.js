import "./NameItem.css";
import Card from './UI/Card';

const NameItem = (props) => {

  return (
    <li>
      <Card className='cost-item'>
          <div className="cost-item__description">
              <h2>{props.name}</h2>
              <div className="cost-item__price">Возраст:{props.age}</div>
          </div>
      </Card>
    </li>
  );
};

export default NameItem;