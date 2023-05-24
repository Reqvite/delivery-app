export interface Food {
    _id: string,
    title: string,
    price: number,
    ingredients: string[],
    img_url: string,
    shop: string,
    quantity?: number;
    totalPrice?: number;
}

export interface CategoriesSchema {
    listOfCategories: string[];
    listOfFood: Food[]
    isLoading: boolean;
    error?: unknown;
}