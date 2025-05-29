// Mobile Navigation Toggle
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    burger.classList.toggle('active');
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            burger.classList.remove('active');
        }
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Sample Recipe Data
const recipes = [
    {
        title: "Avocado Toast",
        description: "Creamy avocado on toasted sourdough with a sprinkle of chili flakes.",
        time: "10 mins",
        category: "breakfast",
        image: "https://images.unsplash.com/photo-1515442261605-65987783cb6a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    {
        title: "Vegetable Stir Fry",
        description: "Colorful veggies with a savory sauce served over rice.",
        time: "25 mins",
        category: "lunch",
        image: "https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80"
    },
    {
        title: "Chocolate Chip Cookies",
        description: "Classic homemade cookies with melty chocolate chips.",
        time: "35 mins",
        category: "dessert",
        image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80"
    },
    {
        title: "Grilled Salmon",
        description: "Perfectly grilled salmon with lemon and herbs.",
        time: "20 mins",
        category: "dinner",
        image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    {
        title: "Berry Smoothie Bowl",
        description: "Refreshing smoothie bowl topped with fresh berries and granola.",
        time: "15 mins",
        category: "breakfast",
        image: "https://images.unsplash.com/photo-1505252585461-04db1a846ebb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=726&q=80"
    },
    {
        title: "Vegan Buddha Bowl",
        description: "Nutritious bowl packed with grains, veggies, and tahini dressing.",
        time: "30 mins",
        category: "vegan",
        image: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
    }
];

// Display Recipes
const recipeGrid = document.querySelector('.recipe-grid');

function displayRecipes(recipesToDisplay) {
    recipeGrid.innerHTML = '';
    
    recipesToDisplay.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.className = 'recipe-card';
        
        recipeCard.innerHTML = `
            <div class="recipe-image">
                <img src="${recipe.image}" alt="${recipe.title}">
            </div>
            <div class="recipe-info">
                <h3>${recipe.title}</h3>
                <p>${recipe.description}</p>
                <div class="recipe-meta">
                    <span class="recipe-time"><i class="far fa-clock"></i> ${recipe.time}</span>
                    <div class="recipe-actions">
                        <button><i class="far fa-heart"></i></button>
                        <button><i class="far fa-share-square"></i></button>
                    </div>
                </div>
            </div>
        `;
        
        recipeGrid.appendChild(recipeCard);
    });
}

// Initialize with all recipes
displayRecipes(recipes);

// Filter Recipes by Category
const categoryTags = document.querySelectorAll('.tag');

categoryTags.forEach(tag => {
    tag.addEventListener('click', () => {
        // Remove active class from all tags
        categoryTags.forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked tag
        tag.classList.add('active');
        
        const category = tag.classList[1];
        
        if (category === 'all') {
            displayRecipes(recipes);
        } else {
            const filteredRecipes = recipes.filter(recipe => recipe.category === category);
            displayRecipes(filteredRecipes);
        }
    });
});

// Search Functionality
const searchInput = document.querySelector('.search-bar input');
const searchButton = document.querySelector('.search-bar button');

function searchRecipes() {
    const searchTerm = searchInput.value.toLowerCase();
    
    if (searchTerm === '') {
        displayRecipes(recipes);
        return;
    }
    
    const filteredRecipes = recipes.filter(recipe => 
        recipe.title.toLowerCase().includes(searchTerm) || 
        recipe.description.toLowerCase().includes(searchTerm)
    );
    
    displayRecipes(filteredRecipes);
}

searchButton.addEventListener('click', searchRecipes);
searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        searchRecipes();
    }
});

// Add animation to elements when they come into view
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.hero-content, .hero-image, .recipe-section h2, .search-bar, .category-card, .share-content, .share-image');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Set initial state for animation
window.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.hero-content, .hero-image, .recipe-section h2, .search-bar, .category-card, .share-content, .share-image');
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Trigger animation after a short delay
    setTimeout(animateOnScroll, 100);
});

window.addEventListener('scroll', animateOnScroll);
