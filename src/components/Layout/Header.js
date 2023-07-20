import {Fragment} from 'react'
import classes from './Header.module.css'
import mealsImage from '../../assets/bg1.jpg'
import HeaderCartButton from './HeaderCartButton'

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>Swiggato</h1>
        {/* <button>Cart</button> */}
        <HeaderCartButton onClick={props.onShowCart}/>
      </header>
      <div className={classes['main-image']}>
        <img src={mealsImage} alt="Delicious Foods"/>
      </div>
    </Fragment>
  )
}

export default Header