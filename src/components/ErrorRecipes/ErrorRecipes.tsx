import {useNavigate} from 'react-router-dom';

export const ErrorRecipes = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className='button section-padding' onClick={() => navigate('/recipes')}>
        Back
      </div>
      <h4>There are no recipes</h4>
    </div>
  )
}