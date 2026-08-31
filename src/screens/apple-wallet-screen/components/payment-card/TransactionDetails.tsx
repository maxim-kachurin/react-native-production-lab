import { mvs, s } from "@utils";
import { StyleSheet, Text, View } from "react-native";

type Transaction = {
  id: string;
  merchant: string;
  amount: string;
};

type TransactionDetailsProps = {
  transactions: readonly Transaction[];
};

const TransactionDetails = ({ transactions }: TransactionDetailsProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Latest Transactions</Text>
      {transactions.map(transaction => (
        <View key={transaction.id} style={styles.transaction}>
          <Text style={styles.merchant}>{transaction.merchant}</Text>
          <Text style={styles.amount}>{transaction.amount}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: s(20),
    paddingTop: s(24),
  },
  title: {
    color: "white",
    fontSize: mvs(22),
    fontWeight: "700",
    marginBottom: s(12),
  },
  transaction: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: s(18),
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#3A3A3C",
  },
  merchant: {
    color: "white",
    fontSize: mvs(16),
  },
  amount: {
    color: "#EBEBF5",
    fontSize: mvs(16),
  },
});

export default TransactionDetails;
