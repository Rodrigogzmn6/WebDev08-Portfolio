const filtersButtons = [];
let filters = [];
let activeFilters = [];

// Create two arrays, one with all filter buttons and the other with all filters
$("#filters").children().each((index, value) => {
    filtersButtons.push(value);
    filters.push(value.innerText);
});

// Create click event for all filter buttons
filtersButtons.forEach(button => {
    $(button).on("click", () => {
        $(button).toggleClass("active");
        $(button).toggleClass("inactive");
        updateActiveFilters()
        updateProjects();
    });
});

updateProjects();

// Create click event for expandable buttons
$(".expandable-button").each((index, button) => {
    $(button).on("click", () => {
        $(".expandable-button").toggleClass("invisible");
        $(".expandable-section").toggleClass("invisible");
    });
});

// Create an array with all active filters
function updateActiveFilters() {
    activeFilters = [];
    filtersButtons.forEach(button => {
        if($(button).hasClass("active")) {
            activeFilters.push(button.innerText);
        }
    });
}

function updateProjects() {
    if(activeFilters.length > 0) {
        $(".project").each((index, project) => {
            let show = false;
            let projectTags = $(project).find("h3")[0];
            projectTags = projectTags.innerText.replaceAll("#", "");
            projectTags = projectTags.split(" ");
            show = activeFilters.every(filter => projectTags.includes(filter));
            show ? $(project).removeClass("invisible") : $(project).addClass("invisible")
            show = false;
        });
    } else {
        $(".project").removeClass("invisible");
    }
}