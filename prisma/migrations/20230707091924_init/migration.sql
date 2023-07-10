-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "code" INTEGER NOT NULL DEFAULT 2,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "nickName" VARCHAR(25) NOT NULL,
    "userName" TEXT NOT NULL,
    "passwork" TEXT NOT NULL,
    "avatar" TEXT NOT NULL DEFAULT '1',
    "phoneNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role_Id" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "nameCategory" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "isPushlished" BOOLEAN NOT NULL,
    "userCreate_Id" INTEGER NOT NULL,
    "userUpdate_Id" INTEGER NOT NULL,
    "userDelete_Id" INTEGER NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Game" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "name" VARCHAR(30) NOT NULL,
    "url" VARCHAR(40) NOT NULL,
    "developer" TEXT NOT NULL,
    "description" VARCHAR(300) NOT NULL,
    "userCreate_Id" INTEGER NOT NULL,
    "userUpdate_Id" INTEGER,
    "userDelete_Id" INTEGER,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category_game" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "category_Id" INTEGER NOT NULL,
    "game_Id" INTEGER NOT NULL,

    CONSTRAINT "category_game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "voucher" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expired" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL,
    "amount" INTEGER NOT NULL DEFAULT 0,
    "userCreate_id" INTEGER NOT NULL,
    "userUpdate_id" INTEGER NOT NULL,

    CONSTRAINT "voucher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feedback" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "title" VARCHAR(50) NOT NULL,
    "content" VARCHAR(3000) NOT NULL,
    "email" TEXT,
    "userSend_id" INTEGER NOT NULL,
    "brand_id" INTEGER NOT NULL,
    "game_id" INTEGER NOT NULL,

    CONSTRAINT "feedback_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneNumber_key" ON "User"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Category_userCreate_Id_key" ON "Category"("userCreate_Id");

-- CreateIndex
CREATE UNIQUE INDEX "Category_userUpdate_Id_key" ON "Category"("userUpdate_Id");

-- CreateIndex
CREATE UNIQUE INDEX "Category_userDelete_Id_key" ON "Category"("userDelete_Id");

-- CreateIndex
CREATE UNIQUE INDEX "Game_name_key" ON "Game"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Game_url_key" ON "Game"("url");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_role_Id_fkey" FOREIGN KEY ("role_Id") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_userCreate_Id_fkey" FOREIGN KEY ("userCreate_Id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_userUpdate_Id_fkey" FOREIGN KEY ("userUpdate_Id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_userDelete_Id_fkey" FOREIGN KEY ("userDelete_Id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_userCreate_Id_fkey" FOREIGN KEY ("userCreate_Id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_userUpdate_Id_fkey" FOREIGN KEY ("userUpdate_Id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_userDelete_Id_fkey" FOREIGN KEY ("userDelete_Id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category_game" ADD CONSTRAINT "category_game_category_Id_fkey" FOREIGN KEY ("category_Id") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category_game" ADD CONSTRAINT "category_game_game_Id_fkey" FOREIGN KEY ("game_Id") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "voucher" ADD CONSTRAINT "voucher_userCreate_id_fkey" FOREIGN KEY ("userCreate_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "voucher" ADD CONSTRAINT "voucher_userUpdate_id_fkey" FOREIGN KEY ("userUpdate_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_userSend_id_fkey" FOREIGN KEY ("userSend_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
