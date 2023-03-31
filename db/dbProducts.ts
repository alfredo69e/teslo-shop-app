import { IProduct } from "@/interfaces";
import { Product } from "@/models";
import { db } from "."


export const getProductBySlug = async ( slug: string ): Promise<IProduct | null> => {

    try {

        await db.connect();

        const product = await Product.findOne({ slug }).lean();

        await db.disconnect();

        if( !product ) return null;

        return JSON.parse( JSON.stringify(product  ) );
        
    } catch ( err ) {
        await db.disconnect();
        return null;
    }

}

interface ProductSlug {
    slug: string
}

export const getAllProductsSlug = async(): Promise<ProductSlug[]> => {

    try {

        await db.connect();

        const slug = await Product.find().select('slug -_id').lean();

        await db.disconnect();

        return slug;
        
    } catch ( err ) {
        await db.disconnect();
        return [];
    }
}


export const getProductsByTerm = async( term: string ): Promise<ProductSlug[]> => {

    try {

        await db.connect();

        const products = await Product.find<IProduct[]>({ $text: { $search: term.toLowerCase() } })
                        .select('title images price inStock slug -_id')
                        .lean();


        await db.disconnect();

        return products;
        
    } catch ( err ) {
        await db.disconnect();
        return [];
    }
}


export const getAllProducts = async(): Promise<ProductSlug[]> => {

    try {

        await db.connect();

        const products = await Product.find<IProduct[]>().lean();


        await db.disconnect();

        return JSON.parse( JSON.stringify( products ) );
        
    } catch ( err ) {
        await db.disconnect();
        return [];
    }
}