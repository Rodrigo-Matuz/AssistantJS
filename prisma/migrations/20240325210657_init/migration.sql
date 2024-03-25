-- CreateTable
CREATE TABLE "MonopolyBoard" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "victories" INTEGER NOT NULL,

    CONSTRAINT "MonopolyBoard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MonopolyBoard_user_id_key" ON "MonopolyBoard"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_user_id_key" ON "User"("user_id");

-- AddForeignKey
ALTER TABLE "MonopolyBoard" ADD CONSTRAINT "MonopolyBoard_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
