describe("Navigation", () => {
  it("should navigate to the about page", () => {
    // 메인 페이지에 접속합니다.
    cy.visit("http://localhost:3000/");

    // 페이지 내용 중 code 요소에 메인 페이지 코드 파일 경로가 보입니다.
    cy.get("code").contains("src/app/page.tsx");

    // Docs 링크를 클릭합니다.
    cy.get('a[href^="https://nextjs.org/docs?"]')
      .invoke("attr", "target", "_self")
      .click();

    // 이동한 페이지는 https://nextjs.org/docs 입니다.
    cy.origin("https://nextjs.org", () => {
      cy.url().should("include", "/docs");
    });
  });
});
