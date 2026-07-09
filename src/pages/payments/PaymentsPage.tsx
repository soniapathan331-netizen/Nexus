import React, { useState } from 'react';
import { Wallet, ArrowUpRight, ArrowDownRight, Send, TrendingUp } from 'lucide-react';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { useAuth } from '../../context/AuthContext';

type TxType = 'Deposit' | 'Withdraw' | 'Transfer' | 'Funding';
type TxStatus = 'Completed' | 'Pending' | 'Failed';

interface Transaction {
  id: number;
  type: TxType;
  amount: number;
  sender: string;
  receiver: string;
  status: TxStatus;
  date: string;
}

const initialTransactions: Transaction[] = [
  { id: 1, type: 'Deposit', amount: 5000, sender: 'Bank Account', receiver: 'You', status: 'Completed', date: '2026-07-08' },
  { id: 2, type: 'Funding', amount: 25000, sender: 'You', receiver: 'TechStart Inc.', status: 'Completed', date: '2026-07-07' },
  { id: 3, type: 'Transfer', amount: 1200, sender: 'You', receiver: 'John Doe', status: 'Pending', date: '2026-07-09' },
  { id: 4, type: 'Withdraw', amount: 800, sender: 'You', receiver: 'Bank Account', status: 'Completed', date: '2026-07-05' },
];

const statusColors: Record<TxStatus, 'success' | 'warning' | 'error'> = {
  Completed: 'success',
  Pending: 'warning',
  Failed: 'error',
};

type ModalType = 'deposit' | 'withdraw' | 'transfer' | 'fund' | null;

export const PaymentsPage: React.FC = () => {
  const { user } = useAuth();
  const [balance, setBalance] = useState(12500);
  const [transactions, setTransactions] = useState(initialTransactions);
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');

  const isInvestor = user?.role === 'investor';

  const closeModal = () => {
    setActiveModal(null);
    setAmount('');
    setRecipient('');
  };

  const handleSubmit = () => {
    const numAmount = parseFloat(amount);
    if (!numAmount || numAmount <= 0) return;

    let newTx: Transaction;
    let newBalance = balance;

    if (activeModal === 'deposit') {
      newTx = { id: Date.now(), type: 'Deposit', amount: numAmount, sender: 'Bank Account', receiver: 'You', status: 'Completed', date: new Date().toISOString().split('T')[0] };
      newBalance += numAmount;
    } else if (activeModal === 'withdraw') {
      newTx = { id: Date.now(), type: 'Withdraw', amount: numAmount, sender: 'You', receiver: 'Bank Account', status: 'Completed', date: new Date().toISOString().split('T')[0] };
      newBalance -= numAmount;
    } else if (activeModal === 'transfer') {
      newTx = { id: Date.now(), type: 'Transfer', amount: numAmount, sender: 'You', receiver: recipient || 'Unknown', status: 'Pending', date: new Date().toISOString().split('T')[0] };
      newBalance -= numAmount;
    } else {
      newTx = { id: Date.now(), type: 'Funding', amount: numAmount, sender: 'You', receiver: recipient || 'Entrepreneur', status: 'Completed', date: new Date().toISOString().split('T')[0] };
      newBalance -= numAmount;
    }

    setTransactions([newTx, ...transactions]);
    setBalance(newBalance);
    closeModal();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
        <p className="text-gray-600">Manage your wallet and transactions</p>
      </div>

      <Card className="bg-primary-600 text-white">
        <CardBody>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-primary-100 text-sm">Wallet Balance</p>
              <h2 className="text-3xl font-bold mt-1">${balance.toLocaleString()}</h2>
            </div>
            <div className="p-4 bg-primary-500 rounded-full">
              <Wallet size={28} />
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <Button variant="outline" className="bg-white text-primary-700" leftIcon={<ArrowDownRight size={16} />} onClick={() => setActiveModal('deposit')}>
              Deposit
            </Button>
            <Button variant="outline" className="bg-white text-primary-700" leftIcon={<ArrowUpRight size={16} />} onClick={() => setActiveModal('withdraw')}>
              Withdraw
            </Button>
            <Button variant="outline" className="bg-white text-primary-700" leftIcon={<Send size={16} />} onClick={() => setActiveModal('transfer')}>
              Transfer
            </Button>
            {isInvestor && (
              <Button variant="outline" className="bg-white text-primary-700" leftIcon={<TrendingUp size={16} />} onClick={() => setActiveModal('fund')}>
                Fund a Deal
              </Button>
            )}
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-lg font-medium text-gray-900">Transaction History</h2>
        </CardHeader>
        <CardBody className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="text-left px-4 py-3 font-medium">Type</th>
                  <th className="text-left px-4 py-3 font-medium">Amount</th>
                  <th className="text-left px-4 py-3 font-medium">Sender</th>
                  <th className="text-left px-4 py-3 font-medium">Receiver</th>
                  <th className="text-left px-4 py-3 font-medium">Status</th>
                  <th className="text-left px-4 py-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map(tx => (
                  <tr key={tx.id} className="border-t border-gray-100">
                    <td className="px-4 py-3">{tx.type}</td>
                    <td className="px-4 py-3 font-medium">${tx.amount.toLocaleString()}</td>
                    <td className="px-4 py-3 text-gray-600">{tx.sender}</td>
                    <td className="px-4 py-3 text-gray-600">{tx.receiver}</td>
                    <td className="px-4 py-3">
                      <Badge variant={statusColors[tx.status]} size="sm">{tx.status}</Badge>
                    </td>
                    <td className="px-4 py-3 text-gray-500">{tx.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>

      {activeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-sm mx-4 p-5">
            <h3 className="text-lg font-medium text-gray-900 mb-4 capitalize">
              {activeModal === 'fund' ? 'Fund a Deal' : activeModal}
            </h3>

            {(activeModal === 'transfer' || activeModal === 'fund') && (
              <div className="mb-3">
                <label className="text-sm text-gray-600">
                  {activeModal === 'fund' ? 'Entrepreneur / Startup' : 'Recipient'}
                </label>
                <input
                  type="text"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                  placeholder={activeModal === 'fund' ? 'e.g. TechStart Inc.' : 'e.g. John Doe'}
                />
              </div>
            )}

            <div className="mb-4">
              <label className="text-sm text-gray-600">Amount ($)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                placeholder="0.00"
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={closeModal}>Cancel</Button>
              <Button size="sm" onClick={handleSubmit}>Confirm</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};