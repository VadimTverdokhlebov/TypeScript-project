import mongoose from 'mongoose';
import { IProductsFromClient } from '../entities/interfaces';
import { IAdditive, IOrder, IProduct } from '../entities/modelsInterfaces';

export function getIdProductsAndAdditives(products: IProductsFromClient[]) {
    const productsId: string[] = [];
    const additivesId: string[] = [];

    for (const product of products) {
        productsId.push(product.id);
        for (const additiveId of product.additives) {
            additivesId.push(String(additiveId));
        };
    }

    return [productsId, additivesId];
}

export function getFilledOrder(
    products: IProductsFromClient[],
    userId: string,
    productsOrder: IProduct[],
    additivesOrder: IAdditive[]) {

    let indexProductOrder = 0;

    const order: IOrder = {
        user: new mongoose.Types.ObjectId(userId),
        products: [],
        status: true,
        sumOrder: 0,
    };

    for (const product of products) {
        const currentProduct = productsOrder.find((elem: IProduct) => elem.id === product.id) as IProduct;

        order.sumOrder += Number(product.amount) * Number(currentProduct.price);

        const insertProduct = {
            product: new mongoose.Types.ObjectId(product.id),
            quantity: product.amount,
            sum: currentProduct.price,
            additives: [],
        };

        order.products.push(insertProduct);

        for (const additiveId of product.additives) {
            const currentAdditive = additivesOrder.find((elem: IAdditive) => elem.id === additiveId) as IAdditive;

            order.sumOrder += Number(product.amount) * Number(currentAdditive.price);
            order.products[indexProductOrder].sum += Number(currentAdditive.price);

            order.products[indexProductOrder].additives.push({
                additive: new mongoose.Types.ObjectId(String(additiveId)),
            });
        }

        indexProductOrder += 1;
    }
    return order;
}
