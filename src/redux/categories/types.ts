export interface Food {
    _id: string,
    title: string,
    price: number,
    ingredients: string[],
    img_url: string,
    shop: string
}

export interface CategoriesSchema {
    listOfCategories: string[];
    listOfFood: Food[]
    isLoading: boolean;
    error?: unknown;
}