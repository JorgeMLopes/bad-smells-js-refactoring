export class ReportGenerator {
  constructor(database) {
    this.db = database;
  }

  generateReport(reportType, user, items) {
    const visibleItems = this.filterItemsByUser(user, items);
    const total = this.calculateTotal(visibleItems);

    let report = this.generateHeader(reportType, user);

    report += this.generateBody(reportType, user, visibleItems);

    report += this.generateFooter(reportType, total);

    return report.trim();
  }

  filterItemsByUser(user, items) {
    if (user.role === 'ADMIN') {
      return items.map((item) => ({
        ...item,
        priority: item.value > 1000,
      }));
    }

    return items.filter((item) => item.value <= 500);
  }

  calculateTotal(items) {
    return items.reduce((sum, item) => sum + item.value, 0);
  }

  generateHeader(reportType, user) {
    if (reportType === 'CSV') {
      return 'ID,NOME,VALOR,USUARIO\n';
    }

    return (
      '<html><body>\n' +
      '<h1>Relatório</h1>\n' +
      `<h2>Usuário: ${user.name}</h2>\n` +
      '<table>\n' +
      '<tr><th>ID</th><th>Nome</th><th>Valor</th></tr>\n'
    );
  }

  generateBody(reportType, user, items) {
    return items
      .map((item) => this.generateItemLine(reportType, user, item))
      .join('');
  }

  generateItemLine(reportType, user, item) {
    if (reportType === 'CSV') {
      return `${item.id},${item.name},${item.value},${user.name}\n`;
    }

    const style = item.priority
      ? ' style="font-weight:bold;"'
      : '';

    return `<tr${style}><td>${item.id}</td><td>${item.name}</td><td>${item.value}</td></tr>\n`;
  }

  generateFooter(reportType, total) {
    if (reportType === 'CSV') {
      return `\nTotal,,\n${total},,\n`;
    }

    return (
      '</table>\n' +
      `<h3>Total: ${total}</h3>\n` +
      '</body></html>\n'
    );
  }
}