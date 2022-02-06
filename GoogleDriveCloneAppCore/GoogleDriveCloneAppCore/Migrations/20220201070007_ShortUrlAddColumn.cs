using Microsoft.EntityFrameworkCore.Migrations;

namespace GoogleDriveCloneAppCore.Migrations
{
    public partial class ShortUrlAddColumn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ShortUrl",
                table: "SharedToUsers",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ShortUrl",
                table: "SharedToUsers");
        }
    }
}
