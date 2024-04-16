const Home = () => {
  const h2Style = {
    fontFamily: 'Arial, sans-serif',
    color: 'black',
    fontSize: '30px',
    fontWeight: 'bold',
  };
  
  return (
    <div>
    
      <h1 style={{ fontFamily: 'Arial, sans-serif', color: '#52B9CA', fontSize: '40px', fontWeight: 'bold', textShadow: '0 0 1px white' }}>Welcome to CookBook Pro</h1>
      <br/>
      <br/>
      <h2 style={h2Style}>Search</h2>
      <p>
        Search for a new, exciting recipe from our collection of thousands of
        savory dishes.
        <br />
        View recipe details, add recipes to your collection, or add a recipe to
        your cart.
        <br />
        <br />
        Type in anything that you are in the mood for and explore!
        <br />
      </p>
      <h2 style={h2Style}>Recommendations</h2>
      <p>
        Want to try something new but don't know where to start?
        <br />
        Try out our awesome recommendation system, powered by AI!
        <br />
        <br />
        Pick the kind of meal you desire and become inspired!
        <br />
      </p>
      <h2 style={h2Style}>Create Recipe</h2>
      <p>
        Can't find the recipe you are looking for? Want to remember a secret family recipe?
        <br />
        Use our recipe creator with the ability to add your own ingredients!
        <br />
        <br />
        Show off and track all of your favorite recipes in a 21st century cookbook.
        <br />
      </p>
      <h2 style={h2Style}>Calendar</h2>
      <p>
        Want to actually remember what you ate for breakfast this morning?
        <br />
        Plan and track recipes days, weeks, months, or even years in advance!
        <br />
        <br />
        Manage your meals and view your daily calorie counts!
        <br />
      </p>
    </div>
  );
};

export default Home;
