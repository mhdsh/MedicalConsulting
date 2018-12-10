using Microsoft.EntityFrameworkCore.Migrations;

namespace MedicalConsulting.API.Migrations
{
    public partial class AddedPublicID : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PublicIdPhoto",
                table: "Users",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PublicIdPhoto",
                table: "Posts",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PublicId",
                table: "Photos",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PublicIdPhoto",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "PublicIdPhoto",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "PublicId",
                table: "Photos");
        }
    }
}
