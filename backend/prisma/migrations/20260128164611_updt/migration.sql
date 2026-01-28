-- DropForeignKey
ALTER TABLE "sales" DROP CONSTRAINT "sales_product_id_fkey";

-- AddForeignKey
ALTER TABLE "sales" ADD CONSTRAINT "sales_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
