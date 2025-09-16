using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ShippingSystem.Migrations
{
    /// <inheritdoc />
    public partial class renamegroups : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GroupPrivilege_AspNetRoles_Group_Id",
                table: "GroupPrivilege");

            migrationBuilder.DropIndex(
                name: "IX_GroupPrivilege_Group_Id",
                table: "GroupPrivilege");

            migrationBuilder.DropColumn(
                name: "Group_Id",
                table: "GroupPrivilege");

            //migrationBuilder.AddColumn<int>(
            //    name: "SaleType",
            //    table: "Representatives",
            //    type: "int",
            //    nullable: false,
            //    defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "GroupId",
                table: "GroupPrivilege",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Group",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Group", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_GroupPrivilege_GroupId",
                table: "GroupPrivilege",
                column: "GroupId");

            migrationBuilder.AddForeignKey(
                name: "FK_GroupPrivilege_Group_GroupId",
                table: "GroupPrivilege",
                column: "GroupId",
                principalTable: "Group",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GroupPrivilege_Group_GroupId",
                table: "GroupPrivilege");

            migrationBuilder.DropTable(
                name: "Group");

            migrationBuilder.DropIndex(
                name: "IX_GroupPrivilege_GroupId",
                table: "GroupPrivilege");

            migrationBuilder.DropColumn(
                name: "SaleType",
                table: "Representatives");

            migrationBuilder.DropColumn(
                name: "GroupId",
                table: "GroupPrivilege");

            migrationBuilder.AddColumn<string>(
                name: "Group_Id",
                table: "GroupPrivilege",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_GroupPrivilege_Group_Id",
                table: "GroupPrivilege",
                column: "Group_Id");

            migrationBuilder.AddForeignKey(
                name: "FK_GroupPrivilege_AspNetRoles_Group_Id",
                table: "GroupPrivilege",
                column: "Group_Id",
                principalTable: "AspNetRoles",
                principalColumn: "Id");
        }
    }
}
