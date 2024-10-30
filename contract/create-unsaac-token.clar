;; errors
(define-constant err-not-candidates (err u101))
(define-constant err-owner-only (err u102))
(define-constant contract-owner 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM)

;; Define unsaac-coin with a maximum of 1,000,000 tokens.
(define-fungible-token unsaac-coin u1000000)

;; Define global variables for counting and storing candidate information
(define-data-var candidates-count uint u0)
(define-data-var tokens-per-candidate uint u10)
(define-data-var total-tokens uint u0)

(define-private (set-candidate-len)
    (var-set candidates-count (len (unwrap-panic (contract-call? 'ST1VSYCCDQ5K5G8TBMPZM3QV2YDGBWWMTWMXJ8XHP.test_vote_2 get-candidates))))
)

(define-public (create-tokens)
    (begin
        ;; (asserts! (is-eq tx-sender contract-owner) err-owner-only)
        (set-candidate-len)
        ;; generate the total tokens to distribute
        (var-set total-tokens (* (var-get candidates-count) (var-get tokens-per-candidate)))
        (try! (ft-mint? unsaac-coin u1000 tx-sender))
        ;; (try! (ft-transfer? unsaac-coin (var-get total-tokens) tx-sender 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM)) ;; Transfer to the contract owner
        (ok true)
    )
)

;; Implement a public function to burn tokens, just in case that there are a lot of tokens in circulation.
(define-public (burn-tokens (amount uint))
    (ft-burn? unsaac-coin amount tx-sender)
)


(define-public (supply-unsaac-coins) 
    (ok (ft-get-balance unsaac-coin tx-sender))
)


(define-read-only (get-candidates-len)
    (var-get candidates-count)
)