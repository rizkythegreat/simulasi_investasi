const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-100 border-t border-gray-200 py-6 mt-12">
      <div className="container mx-auto px-4">
        <div className="text-center text-gray-600 text-sm">
          <p>© {currentYear} SimuSaham. Semua hak dilindungi.</p>
          <p className="mt-1 text-xs">
            Simulator ini hanya untuk tujuan edukasi. Bukan nasihat keuangan.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;