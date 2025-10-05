using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace ShippingSystem.Migrations
{
    /// <inheritdoc />
    public partial class OrderStatusDescription : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_RefreshToken_UserId",
                table: "RefreshToken");

            migrationBuilder.RenameColumn(
                name: "OrderStatus",
                table: "Orders",
                newName: "StatusId");

            migrationBuilder.CreateTable(
                name: "OrderStatus",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderStatus", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "OrderStatusRoleDescriptions",
                columns: table => new
                {
                    StatusId = table.Column<int>(type: "int", nullable: false),
                    RoleId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderStatusRoleDescriptions", x => new { x.StatusId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_OrderStatusRoleDescriptions_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrderStatusRoleDescriptions_OrderStatus_StatusId",
                        column: x => x.StatusId,
                        principalTable: "OrderStatus",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "OrderStatus",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "New" },
                    { 2, "Pending" },
                    { 3, "DeliveredToRepresentitive" },
                    { 4, "DeliveredToCustomer" },
                    { 5, "UnReachable" },
                    { 6, "Postponed" },
                    { 7, "DeliveredPartially" },
                    { 8, "CustomerCanceled" },
                    { 9, "RejectedWithPaying" },
                    { 10, "RejectedWithPartialPaying" },
                    { 11, "RejectedFromEmployee" }
                });

            migrationBuilder.InsertData(
                table: "OrderStatusRoleDescriptions",
                columns: new[] { "RoleId", "StatusId", "Description" },
                values: new object[,]
                {
                    { "1", 1, "جديد" },
                    { "3", 1, "جديد" },
                    { "1", 2, "قيد الانتظار" },
                    { "3", 2, "قيد الانتظار" },
                    { "1", 3, "تم التسليم للمندوب" },
                    { "2", 3, "تم الاسناد" },
                    { "3", 3, "تم التسليم للمندوب" },
                    { "1", 4, "تم التسليم" },
                    { "2", 4, "تم التسليم" },
                    { "3", 4, "تم التسليم" },
                    { "1", 5, "لا يمكن الوصول" },
                    { "2", 5, "لا يمكن الوصول" },
                    { "3", 5, "لا يمكن الوصول" },
                    { "1", 6, "تم التاجيل" },
                    { "2", 6, "تم التاجيل" },
                    { "3", 6, "تم التاجيل" },
                    { "1", 7, "تم التسليم جزئيا" },
                    { "2", 7, "تم التسليم جزئيا" },
                    { "3", 7, "تم التسليم جزئيا" },
                    { "1", 8, "تم الالغاء من قبل المستلم" },
                    { "2", 8, "تم الالغاء من قبل المستلم" },
                    { "3", 8, "تم الالغاء من قبل المستلم" },
                    { "1", 9, "تم الرفض مع الدفع" },
                    { "2", 9, "تم الرفض مع الدفع" },
                    { "3", 9, "تم الرفض مع الدفع" },
                    { "1", 10, "رفض مع سداد جزء" },
                    { "2", 10, "رفض مع سداد جزء" },
                    { "3", 10, "رفض مع سداد جزء" },
                    { "1", 11, "رفض من الموظف" },
                    { "3", 11, "رفض من الموظف" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_RefreshToken_UserId",
                table: "RefreshToken",
                column: "UserId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Orders_StatusId",
                table: "Orders",
                column: "StatusId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderStatusRoleDescriptions_RoleId",
                table: "OrderStatusRoleDescriptions",
                column: "RoleId");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_OrderStatus_StatusId",
                table: "Orders",
                column: "StatusId",
                principalTable: "OrderStatus",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_OrderStatus_StatusId",
                table: "Orders");

            migrationBuilder.DropTable(
                name: "OrderStatusRoleDescriptions");

            migrationBuilder.DropTable(
                name: "OrderStatus");

            migrationBuilder.DropIndex(
                name: "IX_RefreshToken_UserId",
                table: "RefreshToken");

            migrationBuilder.DropIndex(
                name: "IX_Orders_StatusId",
                table: "Orders");

            migrationBuilder.RenameColumn(
                name: "StatusId",
                table: "Orders",
                newName: "OrderStatus");

            migrationBuilder.CreateIndex(
                name: "IX_RefreshToken_UserId",
                table: "RefreshToken",
                column: "UserId");
        }
    }
}
