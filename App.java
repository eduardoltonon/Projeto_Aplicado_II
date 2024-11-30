import java.sql.*;

public class App {
    static final String DB_URL = "jdbc:mysql://localhost:3306/foodtruck_pedidos";
    static final String USER = "root";
    static final String PASS = "Asweman(li)258";

    public static void main(String[] args) {
        // Chame os métodos conforme a necessidade
        obterPedidos();
        obterItensMenu();
        obterPagamentos();
        // Pode comentar ou descomentar chamadas de métodos dependendo do que deseja executar
    }

    public static void obterPedidos() {
        String query = "SELECT p.id_pedido, c.nome AS cliente, m.descricao AS mesa, p.data_pedido, p.tipo_atendimento, p.status, p.total_valor " +
                       "FROM Pedido p " +
                       "JOIN Cliente c ON p.id_cliente = c.id_cliente " +
                       "JOIN Mesa m ON p.id_mesa = m.id_mesa";

        try (Connection conn = DriverManager.getConnection(DB_URL, USER, PASS);
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(query)) {
            
            System.out.println("----- Pedidos -----");
            while (rs.next()) {
                System.out.print("Pedido ID: " + rs.getInt("id_pedido"));
                System.out.print(", Cliente: " + rs.getString("cliente"));
                System.out.print(", Mesa: " + rs.getString("mesa"));
                System.out.print(", Data: " + rs.getTimestamp("data_pedido"));
                System.out.print(", Tipo: " + rs.getString("tipo_atendimento"));
                System.out.print(", Status: " + rs.getString("status"));
                System.out.println(", Valor Total: " + rs.getBigDecimal("total_valor"));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public static void obterItensMenu() {
        String query = "SELECT * FROM Item_Menu";

        try (Connection conn = DriverManager.getConnection(DB_URL, USER, PASS);
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(query)) {

            System.out.println("----- Itens do Menu -----");
            while (rs.next()) {
                System.out.print("Item ID: " + rs.getInt("id_item"));
                System.out.print(", Nome: " + rs.getString("nome"));
                System.out.println(", Preço: " + rs.getBigDecimal("preco"));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public static void obterPagamentos() {
        String query = "SELECT p.id_pagamento, ped.id_pedido, p.metodo_pagamento, p.valor_pago, p.data_pagamento " +
                       "FROM Pagamento p " +
                       "JOIN Pedido ped ON p.id_pedido = ped.id_pedido";

        try (Connection conn = DriverManager.getConnection(DB_URL, USER, PASS);
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(query)) {

            System.out.println("----- Pagamentos -----");
            while (rs.next()) {
                System.out.print("Pagamento ID: " + rs.getInt("id_pagamento"));
                System.out.print(", Pedido ID: " + rs.getInt("id_pedido"));
                System.out.print(", Método: " + rs.getString("metodo_pagamento"));
                System.out.print(", Valor Pago: " + rs.getBigDecimal("valor_pago"));
                System.out.println(", Data: " + rs.getTimestamp("data_pagamento"));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
