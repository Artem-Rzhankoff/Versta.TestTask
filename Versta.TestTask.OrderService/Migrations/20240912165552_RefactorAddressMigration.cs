using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Versta.TestTask.OrderService.Migrations
{
    /// <inheritdoc />
    public partial class RefactorAddressMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "SenderAdress",
                table: "Orders",
                newName: "SenderAddress");

            migrationBuilder.RenameColumn(
                name: "ReceiverAdress",
                table: "Orders",
                newName: "ReceiverAddress");

            migrationBuilder.AlterColumn<double>(
                name: "WeightCargo",
                table: "Orders",
                type: "double precision",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "SenderAddress",
                table: "Orders",
                newName: "SenderAdress");

            migrationBuilder.RenameColumn(
                name: "ReceiverAddress",
                table: "Orders",
                newName: "ReceiverAdress");

            migrationBuilder.AlterColumn<long>(
                name: "WeightCargo",
                table: "Orders",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "double precision");
        }
    }
}
