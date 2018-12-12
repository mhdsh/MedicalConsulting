using Microsoft.EntityFrameworkCore.Migrations;

namespace MedicalConsulting.API.Migrations
{
    public partial class AddColumnVistsToPost : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "visits",
                table: "Posts",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "visits",
                table: "Posts");
        }
    }
}
